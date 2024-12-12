import ScanditFrameworksId

struct IdCaptureCallbackResult: BlockingListenerCallbackResult {
    struct ResultJSON: Decodable {
        let enabled: Bool?
    }

    let finishCallbackID: ListenerEvent.Name
    let result: ResultJSON?

    var enabled: Bool? {
        guard let result = result else {
            return nil
        }

        return result.enabled
    }
}

fileprivate extension CordovaEventEmitter {
    func registerCallback(with event: FrameworksIdCaptureEvent, call: CDVInvokedUrlCommand) {
        registerCallback(with: event.rawValue, call: call)
    }
}

@objc(ScanditIdCapture)
public class ScanditIdCapture: CDVPlugin {
    var idModule: IdCaptureModule!
    var emitter: CordovaEventEmitter!

    override public func pluginInitialize() {
        super.pluginInitialize()
        emitter = CordovaEventEmitter(commandDelegate: commandDelegate)
        let idCaptureListener = FrameworksIdCaptureListener(emitter: emitter)
        idModule = IdCaptureModule(idCaptureListener: idCaptureListener)
        idModule.didStart()
    }

    public override func dispose() {
        idModule.didStop()
        emitter.removeCallbacks()
        super.dispose()
    }

    // MARK: Listeners

    @objc(subscribeDidCaptureListener:)
    func subscribeDidCaptureListener(command: CDVInvokedUrlCommand) {
        idModule.addListener()
        emitter.registerCallback(with: FrameworksIdCaptureEvent.didCaptureId, call: command)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(subscribeDidLocalizeListener:)
    func subscribeDidLocalizeListener(command: CDVInvokedUrlCommand) {
        idModule.addListener()
        emitter.registerCallback(with: FrameworksIdCaptureEvent.didLocalizeId, call: command)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(subscribeDidRejectListener:)
    func subscribeDidRejectListener(command: CDVInvokedUrlCommand) {
        idModule.addListener()
        emitter.registerCallback(with: FrameworksIdCaptureEvent.didRejectId, call: command)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(subscribeDidTimeoutListener:)
    func subscribeDidTimeoutListener(command: CDVInvokedUrlCommand) {
        idModule.addListener()
        emitter.registerCallback(with: FrameworksIdCaptureEvent.timeout, call: command)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(finishCallback:)
    func finishCallback(command: CDVInvokedUrlCommand) {
        guard let result = IdCaptureCallbackResult.from(command) else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        let enabled = result.enabled ?? false
        if result.isForListenerEvent(.didLocalizeInIdCapture) {
            idModule.finishDidLocalizeId(enabled: enabled)
        } else if result.isForListenerEvent(.didCaptureInIdCapture) {
            idModule.finishDidCaptureId(enabled: enabled)
        } else if result.isForListenerEvent(.didRejectInIdCapture) {
            idModule.finishDidRejectId(enabled: enabled)
        } else if result.isForListenerEvent(.didTimoutInIdCapture) {
            idModule.finishTimeout(enabled: enabled)
        } else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
        }
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(verifyCapturedId:)
    func verifyCapturedId(command: CDVInvokedUrlCommand) {
        guard let jsonString = command.arguments[0] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        idModule.verifyCapturedIdAamvaViz(jsonString: jsonString,
                                          result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(verifyCapturedIdAsync:)
    func verifyCapturedIdAsync(command: CDVInvokedUrlCommand) {
        guard let jsonString = command.arguments[0] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        idModule.verifyCapturedIdWithCloud(jsonString: jsonString,
                                          result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(verifyVizMrz:)
    func verifyVizMrz(command: CDVInvokedUrlCommand) {
        guard let jsonString = command.arguments[0] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        idModule.verifyCaptureIdMrzViz(jsonString: jsonString,
                                          result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(createContextForBarcodeVerification:)
    func createContextForBarcodeVerification(command: CDVInvokedUrlCommand) {
        idModule.createAamvaBarcodeVerifier(result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(unregisterListenerForEvents:)
    func unregisterListenerForEvents(command: CDVInvokedUrlCommand) {
        idModule.removeListener()
        idModule.removeAsyncListener()
        emitter.unregisterCallback(with: FrameworksIdCaptureEvent.didCaptureId.rawValue)
        emitter.unregisterCallback(with: FrameworksIdCaptureEvent.didLocalizeId.rawValue)
        emitter.unregisterCallback(with: FrameworksIdCaptureEvent.didRejectId.rawValue)
        emitter.unregisterCallback(with: FrameworksIdCaptureEvent.timeout.rawValue)
    }

    // MARK: Defaults

    @objc(getDefaults:)
    func getDefaults(command: CDVInvokedUrlCommand) {
        commandDelegate.send(.success(message: idModule.defaults.toEncodable() as CDVPluginResult.JSONMessage),
                             callbackId: command.callbackId)
    }

    // MARK: Reset

    @objc(resetIdCapture:)
    func resetIdCapture(command: CDVInvokedUrlCommand) {
        idModule.resetMode()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(updateIdCaptureOverlay:)
    func updateIdCaptureOverlay(command: CDVInvokedUrlCommand) {
        guard let overlayJson = command.defaultArgumentAsString else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        idModule.updateOverlay(overlayJson: overlayJson,
                               result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(updateIdCaptureMode:)
    func updateIdCaptureMode(command: CDVInvokedUrlCommand) {
        guard let modeJson = command.defaultArgumentAsString else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        idModule.updateModeFromJson(modeJson: modeJson,
                                    result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(applyIdCaptureModeSettings:)
    func applyIdCaptureModeSettings(command: CDVInvokedUrlCommand) {
        guard let modeSettingsJson = command.defaultArgumentAsString else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        idModule.applyModeSettings(modeSettingsJson: modeSettingsJson,
                                   result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(setModeEnabledState:)
    func setModeEnabledState(command: CDVInvokedUrlCommand) {
        var enabled = false
        if let value = command.defaultArgumentAsDictionary?["enabled"] as? Bool {
            enabled = value
        }
        idModule.setModeEnabled(enabled: enabled)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(updateIdCaptureFeedback:)
    func updateIdCaptureFeedback(command: CDVInvokedUrlCommand) {
        guard let feedbackJson = command.defaultArgumentAsString else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        idModule.updateFeedback(feedbackJson: feedbackJson,
                                result: CordovaResult(commandDelegate, command.callbackId))
    }
}
