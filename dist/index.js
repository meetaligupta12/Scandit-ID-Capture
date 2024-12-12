var id = require('scandit-cordova-datacapture-id.Id');
var scanditCordovaDatacaptureCore = require('scandit-cordova-datacapture-core.Core');
var scanditDatacaptureFrameworksCore = require('scandit-cordova-datacapture-core.Core');

class NativeIdCaptureProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    createContextForBarcodeVerification(contextJSON) {
        return new Promise((resolve, reject) => {
            NativeIdCaptureProxy.cordovaExec(resolve, reject, CordovaFunction.CreateContextForBarcodeVerification, [
                contextJSON,
            ]);
        });
    }
    resetMode() {
        return new Promise((resolve, reject) => {
            NativeIdCaptureProxy.cordovaExec(resolve, reject, CordovaFunction.ResetIdCapture, null);
        });
    }
    verifyCapturedId(capturedId) {
        return new Promise((resolve, reject) => {
            NativeIdCaptureProxy.cordovaExec(resolve, reject, CordovaFunction.VerifyCapturedId, [
                capturedId,
            ]);
        });
    }
    verifyCapturedIdAsync(capturedId) {
        return new Promise((resolve, reject) => {
            NativeIdCaptureProxy.cordovaExec(resolve, reject, CordovaFunction.VerifyCapturedIdAsync, [
                capturedId,
            ]);
        });
    }
    verifyVizMrz(capturedId) {
        return new Promise((resolve, reject) => {
            NativeIdCaptureProxy.cordovaExec(resolve, reject, CordovaFunction.VerifyVizMrz, [
                capturedId,
            ]);
        });
    }
    setModeEnabledState(enabled) {
        NativeIdCaptureProxy.cordovaExec(null, null, CordovaFunction.SetModeEnabledState, [{ 'enabled': enabled }]);
    }
    updateIdCaptureMode(modeJson) {
        return new Promise((resolve, reject) => {
            NativeIdCaptureProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateIdCaptureMode, [modeJson]);
        });
    }
    applyIdCaptureModeSettings(newSettingsJson) {
        return new Promise((resolve, reject) => {
            NativeIdCaptureProxy.cordovaExec(resolve, reject, CordovaFunction.ApplyIdCaptureModeSettings, [newSettingsJson]);
        });
    }
    updateIdCaptureOverlay(overlayJson) {
        return new Promise((resolve, reject) => {
            NativeIdCaptureProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateIdCaptureOverlay, [overlayJson]);
        });
    }
    updateFeedback(feedbackJson) {
        return new Promise((resolve, reject) => {
            NativeIdCaptureProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateIdCaptureFeedback, [feedbackJson]);
        });
    }
}

class NativeIdCaptureListenerProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    emitInCallback(enabled) {
        this.eventEmitter.emit(id.IdCaptureListenerEvents.inCallback, enabled);
    }
    notifyListeners(event) {
        const done = () => {
            this.emitInCallback(false);
            return { enabled: this.isModeEnabled() };
        };
        this.emitInCallback(true);
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        switch (event.name) {
            case id.IdCaptureListenerEvents.didCapture:
                this.eventEmitter.emit(id.IdCaptureListenerEvents.didCapture, JSON.stringify(event.argument));
                break;
            case id.IdCaptureListenerEvents.didLocalize:
                this.eventEmitter.emit(id.IdCaptureListenerEvents.didLocalize, JSON.stringify(event.argument));
                break;
            case id.IdCaptureListenerEvents.didReject:
                this.eventEmitter.emit(id.IdCaptureListenerEvents.didReject, JSON.stringify(event.argument));
                break;
            case id.IdCaptureListenerEvents.didTimeOut:
                this.eventEmitter.emit(id.IdCaptureListenerEvents.didTimeOut, JSON.stringify(event.argument));
        }
        return done();
    }
    subscribeDidCaptureListener() {
        NativeIdCaptureListenerProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.SubscribeDidCaptureListener, null);
    }
    subscribeDidLocalizeListener() {
        NativeIdCaptureListenerProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.SubscribeDidLocalizeListener, null);
    }
    subscribeDidRejectListener() {
        NativeIdCaptureListenerProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.SubscribeDidRejectListener, null);
    }
    subscribeDidTimeOutListener() {
        NativeIdCaptureListenerProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.SubscribeDidTimeOutListener, null);
    }
    finishDidCaptureCallback(isFinished) {
        NativeIdCaptureListenerProxy.cordovaExec(null, null, CordovaFunction.FinishCallback, [
            { 'finishCallbackID': id.IdCaptureListenerEvents.didCapture, 'result': { 'enabled': isFinished } }
        ]);
    }
    finishDidLocalizeCallback(isFinished) {
        NativeIdCaptureListenerProxy.cordovaExec(null, null, CordovaFunction.FinishCallback, [
            { 'finishCallbackID': id.IdCaptureListenerEvents.didLocalize, 'result': { 'enabled': isFinished } }
        ]);
    }
    finishDidRejectCallback(isFinished) {
        NativeIdCaptureListenerProxy.cordovaExec(null, null, CordovaFunction.FinishCallback, [
            { 'finishCallbackID': id.IdCaptureListenerEvents.didReject, 'result': { 'enabled': isFinished } }
        ]);
    }
    finishDidTimeOutCallback(isFinished) {
        NativeIdCaptureListenerProxy.cordovaExec(null, null, CordovaFunction.FinishCallback, [
            { 'finishCallbackID': id.IdCaptureListenerEvents.didTimeOut, 'result': { 'enabled': isFinished } }
        ]);
    }
    unregisterListenerForEvents() {
        NativeIdCaptureListenerProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.UnregisterListenerForEvents, null);
    }
}

function initIdProxies() {
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('IdCaptureProxy', () => new NativeIdCaptureProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('IdCaptureListenerProxy', () => new NativeIdCaptureListenerProxy());
}

// tslint:disable-next-line:variable-name
const Cordova = {
    pluginName: 'ScanditIdCapture',
    defaults: {},
    exec: (success, error, functionName, args) => scanditCordovaDatacaptureCore.cordovaExec(success, error, Cordova.pluginName, functionName, args),
};
function getDefaults() {
    return new Promise((resolve, reject) => {
        Cordova.exec((defaultsJSON) => {
            id.loadIdDefaults(defaultsJSON);
            initIdProxies();
            resolve();
        }, reject, 'getDefaults', null);
    });
}
function initializeCordovaId() {
    scanditCordovaDatacaptureCore.initializePlugin(Cordova.pluginName, getDefaults);
}
var CordovaFunction;
(function (CordovaFunction) {
    CordovaFunction["CreateContextForBarcodeVerification"] = "createContextForBarcodeVerification";
    CordovaFunction["SubscribeDidCaptureListener"] = "subscribeDidCaptureListener";
    CordovaFunction["SubscribeDidLocalizeListener"] = "subscribeDidLocalizeListener";
    CordovaFunction["SubscribeDidRejectListener"] = "subscribeDidRejectListener";
    CordovaFunction["SubscribeDidTimeOutListener"] = "subscribeDidTimeOutListener";
    CordovaFunction["UnregisterListenerForEvents"] = "unregisterListenerForEvents";
    CordovaFunction["SetModeEnabledState"] = "setModeEnabledState";
    CordovaFunction["ResetIdCapture"] = "resetIdCapture";
    CordovaFunction["VerifyCapturedId"] = "verifyCapturedId";
    CordovaFunction["VerifyCapturedIdAsync"] = "verifyCapturedIdAsync";
    CordovaFunction["VerifyVizMrz"] = "verifyVizMrz";
    CordovaFunction["FinishCallback"] = "finishCallback";
    CordovaFunction["UpdateIdCaptureMode"] = "updateIdCaptureMode";
    CordovaFunction["ApplyIdCaptureModeSettings"] = "applyIdCaptureModeSettings";
    CordovaFunction["UpdateIdCaptureOverlay"] = "updateIdCaptureOverlay";
    CordovaFunction["UpdateIdCaptureFeedback"] = "updateIdCaptureFeedback";
})(CordovaFunction || (CordovaFunction = {}));

initializeCordovaId();

exports.AAMVABarcodeResult = id.AAMVABarcodeResult;
exports.AamvaBarcodeVerificationResult = id.AamvaBarcodeVerificationResult;
Object.defineProperty(exports, "AamvaBarcodeVerificationStatus", {
    enumerable: true,
    get: function () { return id.AamvaBarcodeVerificationStatus; }
});
exports.AamvaBarcodeVerifier = id.AamvaBarcodeVerifier;
exports.AamvaVizBarcodeComparisonResult = id.AamvaVizBarcodeComparisonResult;
exports.AamvaVizBarcodeComparisonVerifier = id.AamvaVizBarcodeComparisonVerifier;
exports.ApecBusinessTravelCardMrzResult = id.ApecBusinessTravelCardMrzResult;
exports.ArgentinaIdBarcodeResult = id.ArgentinaIdBarcodeResult;
exports.CapturedId = id.CapturedId;
Object.defineProperty(exports, "CapturedResultType", {
    enumerable: true,
    get: function () { return id.CapturedResultType; }
});
exports.ChinaExitEntryPermitMRZResult = id.ChinaExitEntryPermitMRZResult;
exports.ChinaMainlandTravelPermitMRZResult = id.ChinaMainlandTravelPermitMRZResult;
exports.ChinaOneWayPermitBackMrzResult = id.ChinaOneWayPermitBackMrzResult;
exports.ChinaOneWayPermitFrontMrzResult = id.ChinaOneWayPermitFrontMrzResult;
exports.ColombiaDlBarcodeResult = id.ColombiaDlBarcodeResult;
exports.ColombiaIdBarcodeResult = id.ColombiaIdBarcodeResult;
exports.CommonAccessCardBarcodeResult = id.CommonAccessCardBarcodeResult;
Object.defineProperty(exports, "ComparisonCheckResult", {
    enumerable: true,
    get: function () { return id.ComparisonCheckResult; }
});
exports.DateResult = id.DateResult;
Object.defineProperty(exports, "DocumentType", {
    enumerable: true,
    get: function () { return id.DocumentType; }
});
Object.defineProperty(exports, "IdAnonymizationMode", {
    enumerable: true,
    get: function () { return id.IdAnonymizationMode; }
});
exports.IdCapture = id.IdCapture;
exports.IdCaptureError = id.IdCaptureError;
exports.IdCaptureFeedback = id.IdCaptureFeedback;
Object.defineProperty(exports, "IdCaptureListenerEvents", {
    enumerable: true,
    get: function () { return id.IdCaptureListenerEvents; }
});
exports.IdCaptureOverlay = id.IdCaptureOverlay;
exports.IdCaptureSession = id.IdCaptureSession;
exports.IdCaptureSettings = id.IdCaptureSettings;
Object.defineProperty(exports, "IdDocumentType", {
    enumerable: true,
    get: function () { return id.IdDocumentType; }
});
Object.defineProperty(exports, "IdImageType", {
    enumerable: true,
    get: function () { return id.IdImageType; }
});
Object.defineProperty(exports, "IdLayout", {
    enumerable: true,
    get: function () { return id.IdLayout; }
});
Object.defineProperty(exports, "IdLayoutLineStyle", {
    enumerable: true,
    get: function () { return id.IdLayoutLineStyle; }
});
Object.defineProperty(exports, "IdLayoutStyle", {
    enumerable: true,
    get: function () { return id.IdLayoutStyle; }
});
exports.LocalizedOnlyId = id.LocalizedOnlyId;
exports.MRZResult = id.MRZResult;
exports.ProfessionalDrivingPermit = id.ProfessionalDrivingPermit;
exports.RejectedId = id.RejectedId;
Object.defineProperty(exports, "RejectionReason", {
    enumerable: true,
    get: function () { return id.RejectionReason; }
});
exports.SouthAfricaDlBarcodeResult = id.SouthAfricaDlBarcodeResult;
exports.SouthAfricaIdBarcodeResult = id.SouthAfricaIdBarcodeResult;
Object.defineProperty(exports, "SupportedSides", {
    enumerable: true,
    get: function () { return id.SupportedSides; }
});
Object.defineProperty(exports, "TextHintPosition", {
    enumerable: true,
    get: function () { return id.TextHintPosition; }
});
exports.USUniformedServicesBarcodeResult = id.USUniformedServicesBarcodeResult;
exports.USVisaVIZResult = id.USVisaVIZResult;
exports.VIZResult = id.VIZResult;
exports.VehicleRestriction = id.VehicleRestriction;
Object.defineProperty(exports, "VizMrzComparisonCheckResult", {
    enumerable: true,
    get: function () { return id.VizMrzComparisonCheckResult; }
});
exports.VizMrzComparisonResult = id.VizMrzComparisonResult;
exports.VizMrzComparisonVerifier = id.VizMrzComparisonVerifier;
