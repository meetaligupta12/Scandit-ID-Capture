export declare const Cordova: {
    pluginName: string;
    defaults: any;
    exec: (success: Function | null, error: Function | null, functionName: string, args: [
        any
    ] | null) => void;
};
export declare function initializeCordovaId(): void;
export declare enum CordovaFunction {
    CreateContextForBarcodeVerification = "createContextForBarcodeVerification",
    SubscribeDidCaptureListener = "subscribeDidCaptureListener",
    SubscribeDidLocalizeListener = "subscribeDidLocalizeListener",
    SubscribeDidRejectListener = "subscribeDidRejectListener",
    SubscribeDidTimeOutListener = "subscribeDidTimeOutListener",
    UnregisterListenerForEvents = "unregisterListenerForEvents",
    SetModeEnabledState = "setModeEnabledState",
    ResetIdCapture = "resetIdCapture",
    VerifyCapturedId = "verifyCapturedId",
    VerifyCapturedIdAsync = "verifyCapturedIdAsync",
    VerifyVizMrz = "verifyVizMrz",
    FinishCallback = "finishCallback",
    UpdateIdCaptureMode = "updateIdCaptureMode",
    ApplyIdCaptureModeSettings = "applyIdCaptureModeSettings",
    UpdateIdCaptureOverlay = "updateIdCaptureOverlay",
    UpdateIdCaptureFeedback = "updateIdCaptureFeedback"
}
