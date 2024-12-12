/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.id

import com.scandit.datacapture.cordova.core.ScanditCaptureCore
import com.scandit.datacapture.cordova.core.data.SerializableCallbackAction
import com.scandit.datacapture.cordova.core.data.SerializableFinishModeCallbackData
import com.scandit.datacapture.cordova.core.errors.JsonParseError
import com.scandit.datacapture.cordova.core.utils.CordovaEventEmitter
import com.scandit.datacapture.cordova.core.utils.CordovaResult
import com.scandit.datacapture.cordova.core.utils.PluginMethod
import com.scandit.datacapture.cordova.core.utils.defaultArgumentAsString
import com.scandit.datacapture.cordova.core.utils.optBoolean
import com.scandit.datacapture.cordova.core.utils.successAndKeepCallback
import com.scandit.datacapture.frameworks.id.IdCaptureModule
import com.scandit.datacapture.frameworks.id.listeners.FrameworksIdCaptureListener
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaPlugin
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject
import java.lang.reflect.Method

class ScanditIdCapture :
    CordovaPlugin() {

    private val eventEmitter = CordovaEventEmitter()

    private val idCaptureModule = IdCaptureModule(FrameworksIdCaptureListener(eventEmitter))

    private lateinit var exposedFunctionsToJs: Map<String, Method>

    private var lastIdCaptureEnabledState: Boolean = false

    override fun pluginInitialize() {
        super.pluginInitialize()
        ScanditCaptureCore.addPlugin(serviceName)
        idCaptureModule.onCreate(cordova.context)

        // Init functions exposed to JS
        exposedFunctionsToJs =
            this.javaClass.methods.filter { it.getAnnotation(PluginMethod::class.java) != null }
                .associateBy { it.name }
    }

    override fun onStop() {
        lastIdCaptureEnabledState = idCaptureModule.isModeEnabled()
        idCaptureModule.setModeEnabled(false)
    }

    override fun onStart() {
        idCaptureModule.setModeEnabled(lastIdCaptureEnabledState)
    }

    override fun onReset() {
        idCaptureModule.onDestroy()
        pluginInitialize()
    }

    override fun onDestroy() {
        idCaptureModule.onDestroy()
        super.onDestroy()
    }

    override fun execute(
        action: String,
        args: JSONArray,
        callbackContext: CallbackContext
    ): Boolean {
        return if (exposedFunctionsToJs.contains(action)) {
            exposedFunctionsToJs[action]?.invoke(this, args, callbackContext)
            true
        } else {
            false
        }
    }

    @PluginMethod
    fun getDefaults(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        callbackContext.success(JSONObject(idCaptureModule.getDefaults()))
    }

    @PluginMethod
    fun createContextForBarcodeVerification(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        idCaptureModule.createContextForBarcodeVerification(CordovaResult(callbackContext))
    }

    @PluginMethod
    fun subscribeDidCaptureListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksIdCaptureListener.ON_ID_CAPTURED_EVENT_NAME,
            callbackContext
        )

        idCaptureModule.addListener()
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun subscribeDidLocalizeListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksIdCaptureListener.ON_ID_LOCALIZED_EVENT_NAME,
            callbackContext
        )

        idCaptureModule.addListener()
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun subscribeDidRejectListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksIdCaptureListener.ON_ID_REJECTED_EVENT_NAME,
            callbackContext
        )

        idCaptureModule.addListener()
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun subscribeDidTimeOutListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksIdCaptureListener.ON_TIMEOUT_EVENT_NAME,
            callbackContext
        )

        idCaptureModule.addListener()
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun unregisterListenerForEvents(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.unregisterCallback(
            FrameworksIdCaptureListener.ON_ID_CAPTURED_EVENT_NAME,
        )

        eventEmitter.unregisterCallback(
            FrameworksIdCaptureListener.ON_ID_LOCALIZED_EVENT_NAME,
        )

        eventEmitter.unregisterCallback(
            FrameworksIdCaptureListener.ON_ID_REJECTED_EVENT_NAME,
        )

        eventEmitter.unregisterCallback(
            FrameworksIdCaptureListener.ON_TIMEOUT_EVENT_NAME,
        )

        idCaptureModule.removeListener()
        idCaptureModule.removeAsyncListener()
        callbackContext.success()
    }

    @PluginMethod
    fun finishCallback(args: JSONArray, callbackContext: CallbackContext) {
        try {
            val data = args.getJSONObject(0)
            // We need the "result" field to exist ( null is also allowed )
            if (!data.has("result")) {
                throw JSONException("Missing result field in response json")
            }
            val result: JSONObject = data.getJSONObject("result")

            if (!data.has(SerializableCallbackAction.FIELD_FINISH_CALLBACK_ID)) {
                throw JSONException("Cannot recognise finish callback action with data $data")
            }

            val resultData = SerializableFinishModeCallbackData.fromJson(result)

            when (data[SerializableCallbackAction.FIELD_FINISH_CALLBACK_ID]) {
                FrameworksIdCaptureListener.ON_ID_CAPTURED_EVENT_NAME ->
                    idCaptureModule.finishDidCaptureId(resultData?.enabled == true)

                FrameworksIdCaptureListener.ON_ID_LOCALIZED_EVENT_NAME ->
                    idCaptureModule.finishDidLocalizeId(resultData?.enabled == true)

                FrameworksIdCaptureListener.ON_ID_REJECTED_EVENT_NAME ->
                    idCaptureModule.finishDidRejectId(resultData?.enabled == true)

                FrameworksIdCaptureListener.ON_TIMEOUT_EVENT_NAME ->
                    idCaptureModule.finishDidTimeout(resultData?.enabled == true)
            }
        } catch (e: JSONException) {
            callbackContext.error(JsonParseError(e.message).serializeContent())
        } catch (e: RuntimeException) { // TODO [SDC-1851] - fine-catch deserializer exceptions
            callbackContext.error(JsonParseError(e.message).serializeContent())
        }
    }

    @PluginMethod
    fun resetIdCapture(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        idCaptureModule.resetMode()
        callbackContext.success()
    }

    @PluginMethod
    fun setModeEnabledState(args: JSONArray, callbackContext: CallbackContext) {
        idCaptureModule.setModeEnabled(args.optBoolean("enabled", false))
        callbackContext.success()
    }

    @PluginMethod
    fun applyIdCaptureModeSettings(args: JSONArray, callbackContext: CallbackContext) {
        idCaptureModule.applyModeSettings(
            args.defaultArgumentAsString,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun updateIdCaptureMode(args: JSONArray, callbackContext: CallbackContext) {
        idCaptureModule.updateModeFromJson(
            args.defaultArgumentAsString,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun updateIdCaptureOverlay(args: JSONArray, callbackContext: CallbackContext) {
        idCaptureModule.updateOverlay(args.defaultArgumentAsString, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun verifyCapturedId(args: JSONArray, callbackContext: CallbackContext) {
        try {
            idCaptureModule.verifyCaptureId(
                args.defaultArgumentAsString,
                CordovaResult(callbackContext)
            )
        } catch (e: Exception) {
            callbackContext.error(JsonParseError(e.message).toString())
        }
    }

    @PluginMethod
    fun verifyVizMrz(args: JSONArray, callbackContext: CallbackContext) {
        try {
            idCaptureModule.vizMrzVerification(
                args.defaultArgumentAsString,
                CordovaResult(callbackContext)
            )
        } catch (e: Exception) {
            callbackContext.error(JsonParseError(e.message).toString())
        }
    }

    @PluginMethod
    fun updateIdCaptureFeedback(args: JSONArray, callbackContext: CallbackContext) {
        idCaptureModule.updateFeedback(
            args.defaultArgumentAsString,
            CordovaResult(callbackContext)
        )
    }
}
