import { IdCaptureListenerProxy } from 'scandit-datacapture-frameworks-id';
import { BaseNativeProxy } from 'scandit-datacapture-frameworks-core';
export declare class NativeIdCaptureListenerProxy extends BaseNativeProxy implements IdCaptureListenerProxy {
    isModeEnabled: () => boolean;
    private static get cordovaExec();
    private emitInCallback;
    private notifyListeners;
    subscribeDidCaptureListener(): void;
    subscribeDidLocalizeListener(): void;
    subscribeDidRejectListener(): void;
    subscribeDidTimeOutListener(): void;
    finishDidCaptureCallback(isFinished: boolean): void;
    finishDidLocalizeCallback(isFinished: boolean): void;
    finishDidRejectCallback(isFinished: boolean): void;
    finishDidTimeOutCallback(isFinished: boolean): void;
    unregisterListenerForEvents(): void;
}
