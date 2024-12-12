var scanditDatacaptureFrameworksCore = require('scandit-cordova-datacapture-core.Core');

exports.ComparisonCheckResult = void 0;
(function (ComparisonCheckResult) {
    ComparisonCheckResult["Passed"] = "passed";
    ComparisonCheckResult["Skipped"] = "skipped";
    ComparisonCheckResult["Failed"] = "failed";
})(exports.ComparisonCheckResult || (exports.ComparisonCheckResult = {}));

class DateResult {
    get day() { return this.json.day; }
    get month() { return this.json.month; }
    get year() { return this.json.year; }
    get localDate() {
        return new Date(this.json.year, this.json.month ? this.json.month - 1 : 1, this.json.day || 1);
    }
    get utcDate() {
        return new Date(Date.UTC(this.json.year, this.json.month ? this.json.month - 1 : 1, this.json.day || 1));
    }
    static fromJSON(json) {
        if (json === null) {
            return null;
        }
        const dateResult = new DateResult();
        dateResult.json = json;
        return dateResult;
    }
}

class DateComparisonCheck {
    get vizValue() {
        return DateResult.fromJSON(this.json.vizValue);
    }
    get aamvaBarcodeValue() {
        return DateResult.fromJSON(this.json.aamvaBarcodeValue);
    }
    get checkResult() { return this.json.checkResult; }
    get resultDescription() { return this.json.resultDescription; }
    static fromJSON(json) {
        const result = new DateComparisonCheck();
        result.json = json;
        return result;
    }
}

exports.IdAnonymizationMode = void 0;
(function (IdAnonymizationMode) {
    IdAnonymizationMode["None"] = "none";
    IdAnonymizationMode["FieldsOnly"] = "fieldsOnly";
    IdAnonymizationMode["ImagesOnly"] = "imagesOnly";
    IdAnonymizationMode["FieldsAndImages"] = "fieldsAndImages";
})(exports.IdAnonymizationMode || (exports.IdAnonymizationMode = {}));

exports.IdDocumentType = void 0;
(function (IdDocumentType) {
    IdDocumentType["AAMVABarcode"] = "aamvaBarcode";
    IdDocumentType["ArgentinaIdBarcode"] = "argentinaIdBarcode";
    IdDocumentType["ColombiaIdBarcode"] = "colombiaIdBarcode";
    IdDocumentType["ColombiaDlBarcode"] = "colombiaDlBarcode";
    IdDocumentType["CommonAccessCardBarcode"] = "commonAccessCardBarcode";
    IdDocumentType["DLVIZ"] = "dlViz";
    IdDocumentType["IdCardMRZ"] = "idCardMrz";
    IdDocumentType["IdCardVIZ"] = "idCardViz";
    IdDocumentType["PassportMRZ"] = "passportMrz";
    IdDocumentType["PassportVIZ"] = "passportViz";
    IdDocumentType["SouthAfricaDlBarcode"] = "southAfricaDlBarcode";
    IdDocumentType["SouthAfricaIdBarcode"] = "southAfricaIdBarcode";
    IdDocumentType["SwissDLMRZ"] = "swissDlMrz";
    IdDocumentType["USUSIdBarcode"] = "usUsIdBarcode";
    IdDocumentType["VisaMRZ"] = "visaMrz";
    IdDocumentType["ChinaMainlandTravelPermitMRZ"] = "chinaMainlandTravelPermitMrz";
    IdDocumentType["ChinaExitEntryPermitMRZ"] = "chinaExitEntryPermitMrz";
    IdDocumentType["ChinaOneWayPermitBackMRZ"] = "chinaOneWayPermitBackMrz";
    IdDocumentType["ChinaOneWayPermitFrontMRZ"] = "chinaOneWayPermitFrontMrz";
    IdDocumentType["ApecBusinessTravelCardMRZ"] = "apecBusinessTravelCardMrz";
})(exports.IdDocumentType || (exports.IdDocumentType = {}));

exports.IdImageType = void 0;
(function (IdImageType) {
    IdImageType["Face"] = "face";
    IdImageType["IdFront"] = "idFront";
    IdImageType["IdBack"] = "idBack";
})(exports.IdImageType || (exports.IdImageType = {}));

class LocalizedOnlyId {
    get location() {
        return this._location;
    }
    static fromJSON(json) {
        const result = new LocalizedOnlyId();
        result._location = scanditDatacaptureFrameworksCore.Quadrilateral.fromJSON(json.location);
        return result;
    }
}

class RejectedId {
    get location() {
        return this._location;
    }
    get rejectionReason() {
        return this._rejectionReason;
    }
    static fromJSON(json) {
        const result = new RejectedId();
        result._location = scanditDatacaptureFrameworksCore.Quadrilateral.fromJSON(json.location);
        result._rejectionReason = json.rejectionReason;
        return result;
    }
}

class StringComparisonCheck {
    get vizValue() { return this.json.vizValue; }
    get aamvaBarcodeValue() { return this.json.aamvaBarcodeValue; }
    get checkResult() { return this.json.checkResult; }
    get resultDescription() { return this.json.resultDescription; }
    static fromJSON(json) {
        const result = new StringComparisonCheck();
        result.json = json;
        return result;
    }
}

exports.SupportedSides = void 0;
(function (SupportedSides) {
    SupportedSides["FrontOnly"] = "frontOnly";
    SupportedSides["FrontAndBack"] = "frontAndBack";
})(exports.SupportedSides || (exports.SupportedSides = {}));

exports.TextHintPosition = void 0;
(function (TextHintPosition) {
    TextHintPosition["AboveViewfinder"] = "aboveViewfinder";
    TextHintPosition["BelowViewfinder"] = "belowViewfinder";
})(exports.TextHintPosition || (exports.TextHintPosition = {}));

exports.VizMrzComparisonCheckResult = void 0;
(function (VizMrzComparisonCheckResult) {
    VizMrzComparisonCheckResult["Passed"] = "passed";
    VizMrzComparisonCheckResult["Skipped"] = "skipped";
    VizMrzComparisonCheckResult["Failed"] = "failed";
})(exports.VizMrzComparisonCheckResult || (exports.VizMrzComparisonCheckResult = {}));

class VizMrzDateComparisonCheck {
    get vizValue() {
        return DateResult.fromJSON(this.json.vizValue);
    }
    get mrzValue() {
        return DateResult.fromJSON(this.json.mrzValue);
    }
    get checkResult() { return this.json.checkResult; }
    get resultDescription() { return this.json.resultDescription; }
    static fromJSON(json) {
        const result = new VizMrzDateComparisonCheck();
        result.json = json;
        return result;
    }
}

class VizMrzStringComparisonCheck {
    get vizValue() { return this.json.vizValue; }
    get mrzValue() { return this.json.mrzValue; }
    get checkResult() { return this.json.checkResult; }
    get resultDescription() { return this.json.resultDescription; }
    static fromJSON(json) {
        const result = new VizMrzStringComparisonCheck();
        result.json = json;
        return result;
    }
}

exports.RejectionReason = void 0;
(function (RejectionReason) {
    RejectionReason["DocumentTypeNotEnabled"] = "documentTypeNotEnabled";
    RejectionReason["IncorrectBarcodeFormat"] = "incorrectBarcodeFormat";
    RejectionReason["DocumentVoided"] = "documentVoided";
})(exports.RejectionReason || (exports.RejectionReason = {}));

function getIdDefaults() {
    return scanditDatacaptureFrameworksCore.FactoryMaker.getInstance('IdDefaults');
}
function parseIdDefaults(jsonDefaults) {
    const idDefaults = {
        IdCapture: {
            Feedback: {
                idCaptured: scanditDatacaptureFrameworksCore.Feedback.fromJSON(JSON.parse(jsonDefaults.IdCaptureFeedback).idCaptured),
                idRejected: scanditDatacaptureFrameworksCore.Feedback.fromJSON(JSON.parse(jsonDefaults.IdCaptureFeedback).idRejected),
                idCaptureTimeout: scanditDatacaptureFrameworksCore.Feedback.fromJSON(JSON.parse(jsonDefaults.IdCaptureFeedback).idCaptureTimeout),
            },
            RecommendedCameraSettings: scanditDatacaptureFrameworksCore.CameraSettings
                .fromJSON(jsonDefaults.RecommendedCameraSettings),
            IdCaptureOverlayDefaults: {
                defaultCapturedBrush: {
                    fillColor: scanditDatacaptureFrameworksCore.Color
                        .fromJSON(jsonDefaults.IdCaptureOverlay.DefaultCapturedBrush.fillColor),
                    strokeColor: scanditDatacaptureFrameworksCore.Color
                        .fromJSON(jsonDefaults.IdCaptureOverlay.DefaultCapturedBrush.strokeColor),
                    strokeWidth: jsonDefaults.IdCaptureOverlay.DefaultCapturedBrush.strokeWidth,
                },
                defaultLocalizedBrush: {
                    fillColor: scanditDatacaptureFrameworksCore.Color
                        .fromJSON(jsonDefaults.IdCaptureOverlay.DefaultLocalizedBrush.fillColor),
                    strokeColor: scanditDatacaptureFrameworksCore.Color
                        .fromJSON(jsonDefaults.IdCaptureOverlay.DefaultLocalizedBrush.strokeColor),
                    strokeWidth: jsonDefaults.IdCaptureOverlay.DefaultLocalizedBrush.strokeWidth,
                },
                defaultRejectedBrush: {
                    fillColor: scanditDatacaptureFrameworksCore.Color
                        .fromJSON(jsonDefaults.IdCaptureOverlay.DefaultRejectedBrush.fillColor),
                    strokeColor: scanditDatacaptureFrameworksCore.Color
                        .fromJSON(jsonDefaults.IdCaptureOverlay.DefaultRejectedBrush.strokeColor),
                    strokeWidth: jsonDefaults.IdCaptureOverlay.DefaultRejectedBrush.strokeWidth,
                },
            },
            IdCaptureSettings: {
                anonymizationMode: jsonDefaults.IdCaptureSettings.anonymizationMode,
                rejectVoidedIds: jsonDefaults.IdCaptureSettings.rejectVoidedIds,
            },
        },
    };
    return idDefaults;
}

function loadIdDefaults(jsonDefaults) {
    const idDefaults = parseIdDefaults(jsonDefaults);
    scanditDatacaptureFrameworksCore.FactoryMaker.bindInstanceIfNotExists('IdDefaults', idDefaults);
}

class AAMVABarcodeResult {
    get aamvaVersion() { return this.json.aamvaVersion; }
    get aliasFamilyName() { return this.json.aliasFamilyName; }
    get aliasGivenName() { return this.json.aliasGivenName; }
    get aliasSuffixName() { return this.json.aliasSuffixName; }
    get isRealId() { return this.json.isRealId; }
    get driverNamePrefix() { return this.json.driverNamePrefix; }
    get driverNameSuffix() { return this.json.driverNameSuffix; }
    get endorsementsCode() { return this.json.endorsementsCode; }
    get eyeColor() { return this.json.eyeColor; }
    get firstNameWithoutMiddleName() { return this.json.firstNameWithoutMiddleName; }
    get firstNameTruncation() { return this.json.firstNameTruncation; }
    get hairColor() { return this.json.hairColor; }
    get heightCm() { return this.json.heightCm; }
    get heightInch() { return this.json.heightInch; }
    get iIN() { return this.json.iin; }
    get issuingJurisdiction() { return this.json.issuingJurisdiction; }
    get issuingJurisdictionIso() { return this.json.issuingJurisdictionIso; }
    get jurisdictionVersion() { return this.json.jurisdictionVersion; }
    get lastNameTruncation() { return this.json.lastNameTruncation; }
    get middleName() { return this.json.middleName; }
    get middleNameTruncation() { return this.json.middleNameTruncation; }
    get placeOfBirth() { return this.json.placeOfBirth; }
    get race() { return this.json.race; }
    get restrictionsCode() { return this.json.restrictionsCode; }
    get vehicleClass() { return this.json.vehicleClass; }
    get weightKg() { return this.json.weightKg; }
    get weightLbs() { return this.json.weightLbs; }
    get cardRevisionDate() {
        return DateResult.fromJSON(this.json.cardRevisionDate);
    }
    get documentDiscriminatorNumber() { return this.json.documentDiscriminatorNumber; }
    get barcodeDataElements() { return this.json.barcodeDataElements; }
    static fromJSON(json) {
        const result = new AAMVABarcodeResult();
        result.json = json;
        return result;
    }
}

exports.AamvaBarcodeVerificationStatus = void 0;
(function (AamvaBarcodeVerificationStatus) {
    AamvaBarcodeVerificationStatus["Authentic"] = "authentic";
    AamvaBarcodeVerificationStatus["LikelyForged"] = "maybeForged";
    AamvaBarcodeVerificationStatus["Forged"] = "forged";
})(exports.AamvaBarcodeVerificationStatus || (exports.AamvaBarcodeVerificationStatus = {}));

class AamvaBarcodeVerificationResult {
    /**
     * @deprecated
     */
    get allChecksPassed() { return this.json.allChecksPassed; }
    get status() {
        return this._status;
    }
    static fromJSON(json) {
        const result = new AamvaBarcodeVerificationResult();
        result.json = json;
        switch (result.json.verificationStatus) {
            case "authentic":
                result._status = exports.AamvaBarcodeVerificationStatus.Authentic;
                break;
            case "maybeForged":
                result._status = exports.AamvaBarcodeVerificationStatus.LikelyForged;
                break;
            case "forged":
                result._status = exports.AamvaBarcodeVerificationStatus.Forged;
                break;
        }
        return result;
    }
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

class IdCaptureController extends scanditDatacaptureFrameworksCore.BaseController {
    static forIdCapture(idCapture) {
        const controller = new IdCaptureController();
        controller.idCapture = idCapture;
        return controller;
    }
    constructor() {
        super('IdCaptureProxy');
    }
    reset() {
        return this._proxy.resetMode();
    }
    verifyCapturedId(capturedId) {
        return this._proxy.verifyCapturedId(capturedId);
    }
    createContextForBarcodeVerification(context) {
        return this._proxy.createContextForBarcodeVerification(JSON.stringify(context.toJSON()));
    }
    verifyCapturedIdAsync(capturedId) {
        return this._proxy.verifyCapturedIdAsync(capturedId);
    }
    verifyVizMrz(capturedId) {
        return this._proxy.verifyVizMrz(capturedId);
    }
    setModeEnabledState(enabled) {
        this._proxy.setModeEnabledState(enabled);
    }
    updateIdCaptureMode() {
        return this._proxy.updateIdCaptureMode(JSON.stringify(this.idCapture.toJSON()));
    }
    applyIdCaptureModeSettings(newSettings) {
        return this._proxy.applyIdCaptureModeSettings(JSON.stringify(newSettings.toJSON()));
    }
    updateIdCaptureOverlay(overlay) {
        return this._proxy.updateIdCaptureOverlay(JSON.stringify(overlay.toJSON()));
    }
    updateFeedback(feedback) {
        return this._proxy.updateFeedback(JSON.stringify(feedback.toJSON()));
    }
}

class ApecBusinessTravelCardMrzResult {
    get documentCode() { return this.json.documentCode; }
    get capturedMrz() { return this.json.capturedMrz; }
    get passportIssuerIso() { return this.json.passportIssuerIso; }
    get passportNumber() { return this.json.passportNumber; }
    get passportDateOfExpiry() {
        return DateResult.fromJSON(this.json.passportDateOfExpiry);
    }
    static fromJSON(json) {
        const result = new ApecBusinessTravelCardMrzResult();
        result.json = json;
        return result;
    }
}

class ArgentinaIdBarcodeResult {
    get personalIdNumber() { return this.json.personalIdNumber; }
    get documentCopy() { return this.json.documentCopy; }
    static fromJSON(json) {
        const result = new ArgentinaIdBarcodeResult();
        result.json = json;
        return result;
    }
}

class ChinaExitEntryPermitMRZResult {
    get documentCode() { return this.json.documentCode; }
    get capturedMrz() { return this.json.capturedMrz; }
    static fromJSON(json) {
        const result = new ChinaExitEntryPermitMRZResult();
        result.json = json;
        return result;
    }
}

class ChinaMainlandTravelPermitMRZResult {
    get documentCode() { return this.json.documentCode; }
    get capturedMrz() { return this.json.capturedMrz; }
    get personalIdNumber() { return this.json.personalIdNumber; }
    get renewalTimes() { return this.json.renewalTimes; }
    get fullNameSimplifiedChinese() { return this.json.fullNameSimplifiedChinese; }
    get omittedCharacterCountInGBKName() { return this.json.omittedCharacterCountInGBKName; }
    get omittedNameCount() { return this.json.omittedNameCount; }
    get issuingAuthorityCode() { return this.json.issuingAuthorityCode; }
    static fromJSON(json) {
        const result = new ChinaMainlandTravelPermitMRZResult();
        result.json = json;
        return result;
    }
}

class ChinaOneWayPermitBackMrzResult {
    get documentCode() { return this.json.documentCode; }
    get namesAreTruncated() { return this.json.namesAreTruncated; }
    get capturedMrz() { return this.json.capturedMrz; }
    static fromJSON(json) {
        const result = new ChinaOneWayPermitBackMrzResult();
        result.json = json;
        return result;
    }
}

class ChinaOneWayPermitFrontMrzResult {
    get documentCode() { return this.json.documentCode; }
    get capturedMrz() { return this.json.capturedMrz; }
    get fullNameSimplifiedChinese() { return this.json.fullNameSimplifiedChinese; }
    static fromJSON(json) {
        const result = new ChinaOneWayPermitFrontMrzResult();
        result.json = json;
        return result;
    }
}

class ColombiaDlBarcodeResult {
    get categories() { return this.json.categories; }
    get identificationType() { return this.json.identificationType; }
    static fromJSON(json) {
        const result = new ColombiaDlBarcodeResult();
        result.json = json;
        return result;
    }
}

class ColombiaIdBarcodeResult {
    get bloodType() { return this.json.bloodType; }
    static fromJSON(json) {
        const result = new ColombiaIdBarcodeResult();
        result.json = json;
        return result;
    }
}

class MRZResult {
    get documentCode() { return this.json.documentCode; }
    get namesAreTruncated() { return this.json.namesAreTruncated; }
    get optional() { return this.json.optional; }
    get optional1() { return this.json.optional1; }
    get capturedMrz() { return this.json.capturedMrz; }
    static fromJSON(json) {
        const result = new MRZResult();
        result.json = json;
        return result;
    }
}

class ProfessionalDrivingPermit {
    get dateOfExpiry() { return DateResult.fromJSON(this.json.dateOfExpiry); }
    get codes() { return this.json.codes; }
    static fromJSON(json) {
        if (json === null) {
            return null;
        }
        const object = new ProfessionalDrivingPermit();
        object.json = json;
        return object;
    }
}

class VehicleRestriction {
    get vehicleCode() { return this.json.vehicleCode; }
    get vehicleRestriction() { return this.json.vehicleRestriction; }
    get dateOfIssue() { return DateResult.fromJSON(this.json.dateOfIssue); }
    static fromJSON(json) {
        if (json === null) {
            return null;
        }
        const object = new VehicleRestriction();
        object.json = json;
        return object;
    }
}

class SouthAfricaDlBarcodeResult {
    get version() { return this.json.version; }
    get licenseCountryOfIssue() { return this.json.licenseCountryOfIssue; }
    get personalIdNumber() { return this.json.personalIdNumber; }
    get personalIdNumberType() { return this.json.personalIdNumberType; }
    get documentCopy() { return this.json.documentCopy; }
    get driverRestrictionCodes() { return this.json.driverRestrictionCodes; }
    get professionalDrivingPermit() {
        return ProfessionalDrivingPermit.fromJSON(this.json.professionalDrivingPermit);
    }
    get vehicleRestrictions() {
        return this.json.vehicleRestrictions.map(json => VehicleRestriction.fromJSON(json));
    }
    static fromJSON(json) {
        const result = new SouthAfricaDlBarcodeResult();
        result.json = json;
        return result;
    }
}

class SouthAfricaIdBarcodeResult {
    get countryOfBirth() { return this.json.countryOfBirth; }
    get countryOfBirthIso() { return this.json.countryOfBirthIso; }
    get citizenshipStatus() { return this.json.citizenshipStatus; }
    get personalIdNumber() { return this.json.personalIdNumber; }
    static fromJSON(json) {
        const result = new SouthAfricaIdBarcodeResult();
        result.json = json;
        return result;
    }
}

class USUniformedServicesBarcodeResult {
    get bloodType() { return this.json.bloodType; }
    get branchOfService() { return this.json.branchOfService; }
    get champusEffectiveDate() {
        return DateResult.fromJSON(this.json.champusEffectiveDate);
    }
    get champusExpiryDate() {
        return DateResult.fromJSON(this.json.champusExpiryDate);
    }
    get civilianHealthCareFlagCode() { return this.json.civilianHealthCareFlagCode; }
    get civilianHealthCareFlagDescription() { return this.json.civilianHealthCareFlagDescription; }
    get commissaryFlagCode() { return this.json.commissaryFlagCode; }
    get commissaryFlagDescription() { return this.json.commissaryFlagDescription; }
    get deersDependentSuffixCode() { return this.json.deersDependentSuffixCode; }
    get deersDependentSuffixDescription() { return this.json.deersDependentSuffixDescription; }
    get directCareFlagCode() { return this.json.directCareFlagCode; }
    get directCareFlagDescription() { return this.json.directCareFlagDescription; }
    get exchangeFlagCode() { return this.json.exchangeFlagCode; }
    get exchangeFlagDescription() { return this.json.exchangeFlagDescription; }
    get eyeColor() { return this.json.eyeColor; }
    get familySequenceNumber() { return this.json.familySequenceNumber; }
    get formNumber() { return this.json.formNumber; }
    get genevaConventionCategory() { return this.json.genevaConventionCategory; }
    get hairColor() { return this.json.hairColor; }
    get height() { return this.json.height; }
    get jpegData() { return this.json.jpegData; }
    get mwrFlagCode() { return this.json.mwrFlagCode; }
    get mwrFlagDescription() { return this.json.mwrFlagDescription; }
    get payGrade() { return this.json.payGrade; }
    get personDesignatorDocument() { return this.json.personDesignatorDocument; }
    get rank() { return this.json.rank; }
    get relationshipCode() { return this.json.relationshipCode; }
    get relationshipDescription() { return this.json.relationshipDescription; }
    get securityCode() { return this.json.securityCode; }
    get serviceCode() { return this.json.serviceCode; }
    get sponsorFlag() { return this.json.sponsorFlag; }
    get sponsorName() { return this.json.sponsorName; }
    get sponsorPersonDesignatorIdentifier() {
        return this.json.sponsorPersonDesignatorIdentifier;
    }
    get statusCode() { return this.json.statusCode; }
    get statusCodeDescription() { return this.json.statusCodeDescription; }
    get version() { return this.json.version; }
    get weight() { return this.json.weight; }
    static fromJSON(json) {
        const result = new USUniformedServicesBarcodeResult();
        result.json = json;
        return result;
    }
}

class USVisaVIZResult {
    get visaNumber() { return this.json.visaNumber; }
    get passportNumber() { return this.json.passportNumber; }
    static fromJSON(json) {
        const result = new USVisaVIZResult();
        result.json = json;
        return result;
    }
}

class CommonCapturedIdFields {
    get firstName() { return this.json.firstName; }
    get lastName() { return this.json.lastName; }
    get fullName() { return this.json.fullName; }
    get secondaryLastName() { return this.json.secondaryLastName; }
    get sex() { return this.json.sex; }
    get dateOfBirth() {
        return DateResult.fromJSON(this.json.dateOfBirth);
    }
    get age() { return this.json.age; }
    get isExpired() { return this.json.isExpired; }
    get nationality() { return this.json.nationality; }
    get address() { return this.json.address; }
    get documentAdditionalNumber() { return this.json.documentAdditionalNumber; }
    get documentType() { return this.json.documentType; }
    get documentNumber() { return this.json.documentNumber; }
    get issuingCountry() { return this.json.issuingCountry; }
    get issuingCountryIso() { return this.json.issuingCountryIso; }
    get dateOfExpiry() {
        return DateResult.fromJSON(this.json.dateOfExpiry);
    }
    get dateOfIssue() {
        return DateResult.fromJSON(this.json.dateOfIssue);
    }
    static fromJSON(json, existingInstance) {
        if (json === null) {
            return null;
        }
        const firstName = json.firstName;
        const lastName = json.lastName;
        const fullName = json.fullName;
        const secondaryLastName = json.secondaryLastName;
        const sex = json.sex;
        const dateOfBirth = DateResult.fromJSON(json.dateOfBirth);
        const age = json.age;
        const isExpired = json.isExpired;
        const nationality = json.nationality;
        const address = json.address;
        const documentType = json.documentType;
        const documentNumber = json.documentNumber;
        const issuingCountry = json.issuingCountry;
        const issuingCountryIso = json.issuingCountryIso;
        const dateOfExpiry = DateResult.fromJSON(json.dateOfExpiry);
        const dateOfIssue = DateResult.fromJSON(json.dateOfIssue);
        if (existingInstance) {
            if (!existingInstance.firstName) {
                json.firstName = firstName;
            }
            if (!existingInstance.lastName) {
                json.lastName = lastName;
            }
            if (!existingInstance.fullName) {
                json.fullName = fullName;
            }
            if (!existingInstance.secondaryLastName) {
                json.secondaryLastName = secondaryLastName;
            }
            if (!existingInstance.sex) {
                json.sex = sex;
            }
            if (!existingInstance.dateOfBirth) {
                json.dateOfBirth = dateOfBirth;
            }
            if (!existingInstance.age) {
                json.age = age;
            }
            if (!existingInstance.isExpired) {
                json.isExpired = isExpired;
            }
            if (!existingInstance.nationality) {
                json.nationality = nationality;
            }
            if (!existingInstance.address) {
                json.address = address;
            }
            if (!existingInstance.documentType) {
                json.documentType = documentType;
            }
            if (!existingInstance.documentNumber) {
                json.documentNumber = documentNumber;
            }
            if (!existingInstance.issuingCountry) {
                json.issuingCountry = issuingCountry;
            }
            if (!existingInstance.issuingCountryIso) {
                json.issuingCountryIso = issuingCountryIso;
            }
            if (!existingInstance.dateOfExpiry) {
                json.dateOfExpiry = dateOfExpiry;
            }
            if (!existingInstance.dateOfIssue) {
                json.dateOfIssue = dateOfIssue;
            }
        }
        const object = new CommonCapturedIdFields();
        object.json = json;
        return object;
    }
}

class VIZResult {
    get additionalAddressInformation() { return this.json.additionalAddressInformation; }
    get additionalNameInformation() { return this.json.additionalNameInformation; }
    get documentAdditionalNumber() { return this.json.documentAdditionalNumber; }
    get employer() { return this.json.employer; }
    get issuingAuthority() { return this.json.issuingAuthority; }
    get issuingJurisdiction() { return this.json.issuingJurisdiction; }
    get issuingJurisdictionIso() { return this.json.issuingJurisdictionIso; }
    get maritalStatus() { return this.json.maritalStatus; }
    get personalIdNumber() { return this.json.personalIdNumber; }
    get placeOfBirth() { return this.json.placeOfBirth; }
    get profession() { return this.json.profession; }
    get race() { return this.json.race; }
    get religion() { return this.json.religion; }
    get residentialStatus() { return this.json.residentialStatus; }
    get capturedSides() { return this.json.capturedSides; }
    get isBackSideCaptureSupported() { return this.json.isBackSideCaptureSupported; }
    get bloodType() { return this.json.bloodType; }
    get sponsor() { return this.json.sponsor; }
    get mothersName() { return this.json.mothersName; }
    get fathersName() { return this.json.fathersName; }
    static fromJSON(json) {
        const result = new VIZResult();
        result.json = json;
        return result;
    }
}

class CommonAccessCardBarcodeResult {
    get version() { return this.json.version; }
    get personDesignatorDocument() { return this.json.personDesignatorDocument; }
    get personDesignatorTypeCode() { return this.json.personDesignatorTypeCode; }
    get ediPersonIdentifier() { return this.json.ediPersonIdentifier; }
    get personnelCategoryCode() { return this.json.personnelCategoryCode; }
    get branchOfService() { return this.json.branchOfService; }
    get personnelEntitlementConditionType() { return this.json.personnelEntitlementConditionType; }
    get rank() { return this.json.rank; }
    get payPlanCode() { return this.json.payPlanCode; }
    get payPlanGradeCode() { return this.json.payPlanGradeCode; }
    get cardInstanceIdentifier() { return this.json.cardInstanceIdentifier; }
    get personMiddleInitial() { return this.json.personMiddleInitial; }
    static fromJSON(json) {
        const result = new CommonAccessCardBarcodeResult();
        result.json = json;
        return result;
    }
}

class CapturedId {
    get firstName() { return this.commonCapturedFields.firstName; }
    get lastName() { return this.commonCapturedFields.lastName; }
    get fullName() { return this.commonCapturedFields.fullName; }
    get secondaryLastName() { return this.commonCapturedFields.secondaryLastName; }
    get sex() { return this.commonCapturedFields.sex; }
    get dateOfBirth() {
        return DateResult.fromJSON(this.commonCapturedFields.dateOfBirth);
    }
    get age() { return this.json.age; }
    get isExpired() { return this.json.isExpired; }
    get nationality() { return this.commonCapturedFields.nationality; }
    get address() { return this.commonCapturedFields.address; }
    get capturedResultType() { return this.json.capturedResultType; }
    get capturedResultTypes() {
        return this.json.capturedResultTypes;
    }
    get documentType() { return this.commonCapturedFields.documentType; }
    get issuingCountryIso() { return this.commonCapturedFields.issuingCountryIso; }
    get issuingCountry() { return this.commonCapturedFields.issuingCountry; }
    get documentAdditionalNumber() { return this.commonCapturedFields.documentAdditionalNumber; }
    get documentNumber() { return this.commonCapturedFields.documentNumber; }
    get dateOfExpiry() {
        return DateResult.fromJSON(this.commonCapturedFields.dateOfExpiry);
    }
    get dateOfIssue() {
        return DateResult.fromJSON(this.commonCapturedFields.dateOfIssue);
    }
    get aamvaBarcodeResult() {
        if (this._aamvaBarcodeResult == null && this.json.aamvaBarcodeResult != null) {
            this._aamvaBarcodeResult = AAMVABarcodeResult.
                fromJSON(this.json.aamvaBarcodeResult);
        }
        return this._aamvaBarcodeResult;
    }
    get argentinaIdBarcodeResult() {
        if (this._argentinaIdBarcodeResult == null && this.json.argentinaIdBarcodeResult != null) {
            this._argentinaIdBarcodeResult = ArgentinaIdBarcodeResult.
                fromJSON(this.json.argentinaIdBarcodeResult);
        }
        return this._argentinaIdBarcodeResult;
    }
    get colombiaIdBarcodeResult() {
        if (this._colombiaIdBarcodeResult == null && this.json.colombiaIdBarcodeResult != null) {
            this._colombiaIdBarcodeResult = ColombiaIdBarcodeResult.
                fromJSON(this.json.colombiaIdBarcodeResult);
        }
        return this._colombiaIdBarcodeResult;
    }
    get colombiaDlBarcodeResult() {
        if (this._colombiaDlBarcodeResult == null && this.json.colombiaDlBarcodeResult != null) {
            this._colombiaDlBarcodeResult = ColombiaDlBarcodeResult.
                fromJSON(this.json.colombiaDlBarcodeResult);
        }
        return this._colombiaDlBarcodeResult;
    }
    get mrzResult() {
        if (this._mrzResult == null && this.json.mrzResult != null) {
            this._mrzResult = MRZResult.fromJSON(this.json.mrzResult);
        }
        return this._mrzResult;
    }
    get southAfricaIdBarcodeResult() {
        if (this._southAfricaIdBarcodeResult == null && this.json.southAfricaIdBarcodeResult != null) {
            this._southAfricaIdBarcodeResult = SouthAfricaIdBarcodeResult.
                fromJSON(this.json.southAfricaIdBarcodeResult);
        }
        return this._southAfricaIdBarcodeResult;
    }
    get southAfricaDlBarcodeResult() {
        if (this._southAfricaDlBarcodeResult == null && this.json.southAfricaDlBarcodeResult != null) {
            this._southAfricaDlBarcodeResult = SouthAfricaDlBarcodeResult.
                fromJSON(this.json.southAfricaDlBarcodeResult);
        }
        return this._southAfricaDlBarcodeResult;
    }
    get commonAccessCardBarcodeResult() {
        if (this._commonAccessBarcodeResult == null && this.json.commonAccessCardBarcodeResult != null) {
            this._commonAccessBarcodeResult = CommonAccessCardBarcodeResult.
                fromJSON(this.json.commonAccessCardBarcodeResult);
        }
        return this._commonAccessBarcodeResult;
    }
    get usUniformedServicesBarcodeResult() {
        if (this._usUniformedServicesBarcodeResult == null && this.json.usUniformedServicesBarcodeResult != null) {
            const fromJSON = USUniformedServicesBarcodeResult.fromJSON;
            this._usUniformedServicesBarcodeResult = fromJSON(this.json.usUniformedServicesBarcodeResult);
        }
        return this._usUniformedServicesBarcodeResult;
    }
    get usVisaViz() {
        if (this._usVisaVizResult == null && this.json.usVisaVizResult != null) {
            const fromJSON = USVisaVIZResult.fromJSON;
            this._usVisaVizResult = fromJSON(this.json.usVisaVizResult);
        }
        return this._usVisaVizResult;
    }
    get vizResult() {
        if (this._vizResult == null && this.json.vizResult != null) {
            this._vizResult = VIZResult.fromJSON(this.json.vizResult);
        }
        return this._vizResult;
    }
    get chinaMainlandTravelPermitMRZResult() {
        if (this._chinaMainlandTravelPermitMRZResult == null && this.json.chinaMainlandTravelPermitMrzResult != null) {
            this._chinaMainlandTravelPermitMRZResult =
                ChinaMainlandTravelPermitMRZResult
                    .fromJSON(this.json.chinaMainlandTravelPermitMrzResult);
        }
        return this._chinaMainlandTravelPermitMRZResult;
    }
    get chinaExitEntryPermitMRZResult() {
        if (this._chinaExitEntryPermitMRZResult == null && this.json.chinaExitEntryPermitMrzResult != null) {
            this._chinaExitEntryPermitMRZResult =
                ChinaExitEntryPermitMRZResult
                    .fromJSON(this.json.chinaExitEntryPermitMrzResult);
        }
        return this._chinaExitEntryPermitMRZResult;
    }
    get chinaOneWayPermitBackMrzResult() {
        if (this._chinaOneWayPermitBackMrzResult == null && this.json.chinaOneWayPermitBackMrzResult != null) {
            this._chinaOneWayPermitBackMrzResult =
                ChinaOneWayPermitBackMrzResult
                    .fromJSON(this.json.chinaOneWayPermitBackMrzResult);
        }
        return this._chinaOneWayPermitBackMrzResult;
    }
    get chinaOneWayPermitFrontMrzResult() {
        if (this._chinaOneWayPermitFrontMrzResult == null && this.json.chinaOneWayPermitFrontMrzResult != null) {
            this._chinaOneWayPermitFrontMrzResult =
                ChinaOneWayPermitFrontMrzResult
                    .fromJSON(this.json.chinaOneWayPermitFrontMrzResult);
        }
        return this._chinaOneWayPermitFrontMrzResult;
    }
    get apecBusinessTravelCardMrzResult() {
        if (this._apecBusinessTravelCardMrzResult == null && this.json.apecBusinessTravelCardMrzResult != null) {
            this._apecBusinessTravelCardMrzResult =
                ApecBusinessTravelCardMrzResult
                    .fromJSON(this.json.apecBusinessTravelCardMrzResult);
        }
        return this._apecBusinessTravelCardMrzResult;
    }
    static fromJSON(json) {
        const result = new CapturedId();
        result.json = json;
        if (json.aamvaBarcodeResult) {
            result.commonCapturedFields = CommonCapturedIdFields.fromJSON(json.aamvaBarcodeResult, result.commonCapturedFields);
        }
        if (json.argentinaIdBarcodeResult) {
            result.commonCapturedFields = CommonCapturedIdFields.fromJSON(json.argentinaIdBarcodeResult, result.commonCapturedFields);
        }
        if (json.colombiaIdBarcodeResult) {
            result.commonCapturedFields = CommonCapturedIdFields.fromJSON(json.colombiaIdBarcodeResult, result.commonCapturedFields);
        }
        if (json.colombiaDlBarcodeResult) {
            result.commonCapturedFields = CommonCapturedIdFields.fromJSON(json.colombiaDlBarcodeResult, result.commonCapturedFields);
        }
        if (json.mrzResult) {
            result.commonCapturedFields = CommonCapturedIdFields.fromJSON(json.mrzResult, result.commonCapturedFields);
        }
        if (json.southAfricaIdBarcodeResult) {
            result.commonCapturedFields = CommonCapturedIdFields.fromJSON(json.southAfricaIdBarcodeResult, result.commonCapturedFields);
        }
        if (json.southAfricaDlBarcodeResult) {
            result.commonCapturedFields = CommonCapturedIdFields.fromJSON(json.southAfricaDlBarcodeResult, result.commonCapturedFields);
        }
        if (json.commonAccessCardBarcodeResult) {
            result.commonCapturedFields = CommonCapturedIdFields.fromJSON(json.commonAccessCardBarcodeResult, result.commonCapturedFields);
        }
        if (json.usUniformedServicesBarcodeResult) {
            result.commonCapturedFields = CommonCapturedIdFields.fromJSON(json.usUniformedServicesBarcodeResult, result.commonCapturedFields);
        }
        if (json.usVisaVizResult) {
            result.commonCapturedFields = CommonCapturedIdFields.fromJSON(json.usVisaVizResult, result.commonCapturedFields);
        }
        if (json.vizResult) {
            result.commonCapturedFields = CommonCapturedIdFields.fromJSON(json.vizResult, result.commonCapturedFields);
        }
        if (json.chinaMainlandTravelPermitMrzResult) {
            result.commonCapturedFields = CommonCapturedIdFields.fromJSON(json.chinaMainlandTravelPermitMrzResult, result.commonCapturedFields);
        }
        if (json.chinaExitEntryPermitMrzResult) {
            result.commonCapturedFields = CommonCapturedIdFields.fromJSON(json.chinaExitEntryPermitMrzResult, result.commonCapturedFields);
        }
        if (json.chinaOneWayPermitBackMrzResult) {
            result.commonCapturedFields = CommonCapturedIdFields.fromJSON(json.chinaOneWayPermitBackMrzResult, result.commonCapturedFields);
        }
        if (json.chinaOneWayPermitFrontMrzResult) {
            result.commonCapturedFields = CommonCapturedIdFields.fromJSON(json.chinaOneWayPermitFrontMrzResult, result.commonCapturedFields);
        }
        if (json.apecBusinessTravelCardMrzResult) {
            result.commonCapturedFields = CommonCapturedIdFields.fromJSON(json.apecBusinessTravelCardMrzResult, result.commonCapturedFields);
        }
        return result;
    }
    idImageOfType(type) {
        if (this.json.imageInfo === null) {
            return null;
        }
        return this.json.imageInfo[type];
    }
}

class IdCaptureError {
    get type() {
        return this._type;
    }
    get message() {
        return this._message;
    }
    static fromJSON(json) {
        const error = new IdCaptureError();
        error._type = json.type;
        error._message = json.message;
        return error;
    }
}

class IdCaptureSession {
    get newlyCapturedId() {
        return this._newlyCapturedId;
    }
    get frameSequenceId() {
        return this._frameSequenceId;
    }
    get localizedOnlyId() {
        return this._localizedOnlyId;
    }
    get newlyRejectedId() {
        return this._newlyRejectedId;
    }
    static fromJSON(json) {
        const session = new IdCaptureSession();
        if (json.newlyCapturedId) {
            session._newlyCapturedId = CapturedId.fromJSON(json.newlyCapturedId);
        }
        if (json.localizedOnlyId) {
            session._localizedOnlyId = LocalizedOnlyId.fromJSON(json.localizedOnlyId);
        }
        if (json.newlyRejectedId) {
            session._newlyRejectedId = LocalizedOnlyId.fromJSON(json.newlyRejectedId);
        }
        session._frameSequenceId = json.frameSequenceId;
        session._error = json.error ? IdCaptureError.fromJSON(json.error) : null;
        return session;
    }
}

exports.IdCaptureListenerEvents = void 0;
(function (IdCaptureListenerEvents) {
    IdCaptureListenerEvents["inCallback"] = "IdCaptureListener.inCallback";
    IdCaptureListenerEvents["didCapture"] = "IdCaptureListener.didCaptureId";
    IdCaptureListenerEvents["didLocalize"] = "IdCaptureListener.didLocalizeId";
    IdCaptureListenerEvents["didReject"] = "IdCaptureListener.didRejectId";
    IdCaptureListenerEvents["didTimeOut"] = "IdCaptureListener.didTimeout";
})(exports.IdCaptureListenerEvents || (exports.IdCaptureListenerEvents = {}));

class IdCaptureListenerController {
    get _proxy() {
        return scanditDatacaptureFrameworksCore.FactoryMaker.getInstance('IdCaptureListenerProxy');
    }
    static forIdCapture(idCapture) {
        const controller = new IdCaptureListenerController();
        controller.idCapture = idCapture;
        controller._proxy.isModeEnabled = () => idCapture.isEnabled;
        return controller;
    }
    constructor() {
        this.eventEmitter = scanditDatacaptureFrameworksCore.FactoryMaker.getInstance('EventEmitter');
    }
    subscribeListener() {
        this._proxy.subscribeDidCaptureListener();
        this._proxy.subscribeDidLocalizeListener();
        this._proxy.subscribeDidRejectListener();
        this._proxy.subscribeDidTimeOutListener();
        this.eventEmitter.on(exports.IdCaptureListenerEvents.inCallback, (value) => {
            this.idCapture.isInListenerCallback = value;
        });
        this.eventEmitter.on(exports.IdCaptureListenerEvents.didCapture, (body) => {
            const payload = JSON.parse(body);
            const session = IdCaptureSession.fromJSON(JSON.parse(payload.session));
            this.notifyListenersOfDidCapture(session);
            this._proxy.finishDidCaptureCallback(this.idCapture.isEnabled);
        });
        this.eventEmitter.on(exports.IdCaptureListenerEvents.didLocalize, (body) => {
            const payload = JSON.parse(body);
            const session = IdCaptureSession.fromJSON(JSON.parse(payload.session));
            this.notifyListenersOfDidLocalize(session);
            this._proxy.finishDidLocalizeCallback(this.idCapture.isEnabled);
        });
        this.eventEmitter.on(exports.IdCaptureListenerEvents.didReject, (body) => {
            const payload = JSON.parse(body);
            const session = IdCaptureSession.fromJSON(JSON.parse(payload.session));
            this.notifyListenersOfDidReject(session);
            this._proxy.finishDidRejectCallback(this.idCapture.isEnabled);
        });
        this.eventEmitter.on(exports.IdCaptureListenerEvents.didTimeOut, (body) => {
            const payload = JSON.parse(body);
            const session = IdCaptureSession.fromJSON(JSON.parse(payload.session));
            this.notifyListenersOfDidTimeOut(session);
            this._proxy.finishDidTimeOutCallback(this.idCapture.isEnabled);
        });
    }
    unsubscribeListener() {
        this._proxy.unregisterListenerForEvents();
        this.eventEmitter.removeAllListeners(exports.IdCaptureListenerEvents.inCallback);
        this.eventEmitter.removeAllListeners(exports.IdCaptureListenerEvents.didCapture);
        this.eventEmitter.removeAllListeners(exports.IdCaptureListenerEvents.didLocalize);
        this.eventEmitter.removeAllListeners(exports.IdCaptureListenerEvents.didReject);
        this.eventEmitter.removeAllListeners(exports.IdCaptureListenerEvents.didTimeOut);
    }
    notifyListenersOfDidCapture(session) {
        const mode = this.idCapture;
        mode.isInListenerCallback = true;
        mode.listeners.forEach(listener => {
            if (listener.didCaptureId) {
                listener.didCaptureId(this.idCapture, session, scanditDatacaptureFrameworksCore.CameraController.getLastFrame);
            }
        });
        mode.isInListenerCallback = false;
    }
    notifyListenersOfDidLocalize(session) {
        const mode = this.idCapture;
        mode.isInListenerCallback = true;
        mode.listeners.forEach(listener => {
            if (listener.didLocalizeId) {
                listener.didLocalizeId(this.idCapture, session, scanditDatacaptureFrameworksCore.CameraController.getLastFrame);
            }
        });
        mode.isInListenerCallback = false;
    }
    notifyListenersOfDidReject(session) {
        const mode = this.idCapture;
        mode.isInListenerCallback = true;
        mode.listeners.forEach(listener => {
            if (listener.didRejectId) {
                listener.didRejectId(this.idCapture, session, scanditDatacaptureFrameworksCore.CameraController.getLastFrame);
            }
        });
        mode.isInListenerCallback = false;
    }
    notifyListenersOfDidTimeOut(session) {
        const mode = this.idCapture;
        mode.isInListenerCallback = true;
        mode.listeners.forEach(listener => {
            if (listener.didTimeoutInSession) {
                listener.didTimeoutInSession(this.idCapture, session, scanditDatacaptureFrameworksCore.CameraController.getLastFrame);
            }
        });
        mode.isInListenerCallback = false;
    }
}

class IdCaptureFeedback extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get defaultFeedback() {
        return new IdCaptureFeedback(IdCaptureFeedback.idDefaults.IdCapture.Feedback.idCaptured, IdCaptureFeedback.idDefaults.IdCapture.Feedback.idRejected, IdCaptureFeedback.idDefaults.IdCapture.Feedback.idCaptureTimeout);
    }
    get idCaptured() {
        return this._idCaptured;
    }
    set idCaptured(idCaptured) {
        this._idCaptured = idCaptured;
        this.updateFeedback();
    }
    get idRejected() {
        return this._idRejected;
    }
    set idRejected(idRejected) {
        this._idRejected = idRejected;
        this.updateFeedback();
    }
    get idCaptureTimeout() {
        return this._idCaptureTimeout;
    }
    set idCaptureTimeout(idCaptureTimeout) {
        this._idCaptureTimeout = idCaptureTimeout;
        this.updateFeedback();
    }
    static fromJSON(json) {
        const idCaptured = scanditDatacaptureFrameworksCore.Feedback.fromJSON(json.idCaptured);
        const idRejected = scanditDatacaptureFrameworksCore.Feedback.fromJSON(json.idRejected);
        const idCaptureTimeout = scanditDatacaptureFrameworksCore.Feedback.fromJSON(json.idCaptureTimeout);
        return new IdCaptureFeedback(idCaptured, idRejected, idCaptureTimeout);
    }
    static get idDefaults() {
        return getIdDefaults();
    }
    updateFeedback() {
        var _a;
        (_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateFeedback(this);
    }
    constructor(idCaptured, idRejected, idCaptureTimeout) {
        super();
        this.controller = null;
        this._idCaptured = IdCaptureFeedback.idDefaults.IdCapture.Feedback.idCaptured;
        this._idRejected = IdCaptureFeedback.idDefaults.IdCapture.Feedback.idRejected;
        this._idCaptureTimeout = IdCaptureFeedback.idDefaults.IdCapture.Feedback.idCaptureTimeout;
        this.idCaptured = idCaptured;
        this.idRejected = idRejected;
        this.idCaptureTimeout = idCaptureTimeout;
    }
}
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], IdCaptureFeedback.prototype, "controller", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.nameForSerialization('idCaptured')
], IdCaptureFeedback.prototype, "_idCaptured", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.nameForSerialization('idRejected')
], IdCaptureFeedback.prototype, "_idRejected", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.nameForSerialization('idCaptureTimeout')
], IdCaptureFeedback.prototype, "_idCaptureTimeout", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], IdCaptureFeedback, "idDefaults", null);

class IdCapture extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get isEnabled() {
        return this._isEnabled;
    }
    set isEnabled(isEnabled) {
        this._isEnabled = isEnabled;
        this.controller.setModeEnabledState(isEnabled);
    }
    get context() {
        return this._context;
    }
    get feedback() {
        return this._feedback;
    }
    set feedback(feedback) {
        this._feedback = feedback;
        this._feedback.controller = this.controller;
        this.controller.updateFeedback(feedback);
    }
    static get recommendedCameraSettings() {
        return new scanditDatacaptureFrameworksCore.CameraSettings(IdCapture.idCaptureDefaults.IdCapture.RecommendedCameraSettings);
    }
    get _context() {
        return this.privateContext;
    }
    set _context(newContext) {
        if (newContext == null) {
            this.listenerController.unsubscribeListener();
        }
        else if (this.privateContext == null) {
            this.listenerController.subscribeListener();
        }
        this.privateContext = newContext;
    }
    static get idCaptureDefaults() {
        return scanditDatacaptureFrameworksCore.FactoryMaker.getInstance('IdDefaults');
    }
    static forContext(context, settings) {
        const idCapture = new IdCapture();
        idCapture.settings = settings;
        if (context) {
            context.addMode(idCapture);
        }
        return idCapture;
    }
    constructor() {
        super();
        this.type = 'idCapture';
        this._isEnabled = true;
        this._feedback = IdCaptureFeedback.defaultFeedback;
        this.privateContext = null;
        this.listeners = [];
        this.isInListenerCallback = false;
        this.controller = IdCaptureController.forIdCapture(this);
        this.listenerController = IdCaptureListenerController.forIdCapture(this);
        this.feedback.controller = this.controller;
    }
    applySettings(settings) {
        this.settings = settings;
        return this.controller.applyIdCaptureModeSettings(settings);
    }
    addListener(listener) {
        if (this.listeners.includes(listener)) {
            return;
        }
        this.listeners.push(listener);
    }
    removeListener(listener) {
        if (!this.listeners.includes(listener)) {
            return;
        }
        this.listeners.splice(this.listeners.indexOf(listener), 1);
    }
    reset() {
        return this.controller.reset();
    }
}
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], IdCapture.prototype, "_isEnabled", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.nameForSerialization('feedback')
], IdCapture.prototype, "_feedback", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], IdCapture.prototype, "privateContext", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], IdCapture.prototype, "listeners", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], IdCapture.prototype, "controller", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], IdCapture.prototype, "listenerController", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], IdCapture.prototype, "isInListenerCallback", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], IdCapture, "idCaptureDefaults", null);

exports.IdLayoutLineStyle = void 0;
(function (IdLayoutLineStyle) {
    IdLayoutLineStyle["Light"] = "light";
    IdLayoutLineStyle["Bold"] = "bold";
})(exports.IdLayoutLineStyle || (exports.IdLayoutLineStyle = {}));

exports.IdLayout = void 0;
(function (IdLayout) {
    IdLayout["TD1"] = "td1";
    IdLayout["TD2"] = "td2";
    IdLayout["TD3"] = "td3";
    IdLayout["MRVa"] = "mrvA";
    IdLayout["VIZ"] = "viz";
    IdLayout["PDF417"] = "pdf417";
    IdLayout["Auto"] = "auto";
    IdLayout["None"] = "none";
})(exports.IdLayout || (exports.IdLayout = {}));

exports.IdLayoutStyle = void 0;
(function (IdLayoutStyle) {
    IdLayoutStyle["Rounded"] = "rounded";
    IdLayoutStyle["Square"] = "square";
})(exports.IdLayoutStyle || (exports.IdLayoutStyle = {}));

class IdCaptureOverlay extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get idCaptureDefaults() {
        return scanditDatacaptureFrameworksCore.FactoryMaker.getInstance('IdDefaults');
    }
    static withIdCapture(idCapture) {
        return IdCaptureOverlay.withIdCaptureForView(idCapture, null);
    }
    static withIdCaptureForView(idCapture, view) {
        const overlay = new IdCaptureOverlay();
        overlay.idCapture = idCapture;
        if (view) {
            view.addOverlay(overlay);
        }
        return overlay;
    }
    constructor() {
        super();
        this.type = 'idCapture';
        this._idLayout = exports.IdLayout.Auto;
        this._idLayoutStyle = exports.IdLayoutStyle.Rounded;
        this._idLayoutLineStyle = exports.IdLayoutLineStyle.Light;
        this._textHintPosition = exports.TextHintPosition.AboveViewfinder;
        this._showTextHints = true;
        this._defaultCapturedBrush = new scanditDatacaptureFrameworksCore.Brush(IdCaptureOverlay.idCaptureDefaults.IdCapture.IdCaptureOverlayDefaults.defaultCapturedBrush.fillColor, IdCaptureOverlay.idCaptureDefaults.IdCapture.IdCaptureOverlayDefaults.defaultCapturedBrush.strokeColor, IdCaptureOverlay.idCaptureDefaults.IdCapture.IdCaptureOverlayDefaults.defaultCapturedBrush.strokeWidth);
        this._defaultLocalizedBrush = new scanditDatacaptureFrameworksCore.Brush(IdCaptureOverlay.idCaptureDefaults.IdCapture.IdCaptureOverlayDefaults.defaultLocalizedBrush.fillColor, IdCaptureOverlay.idCaptureDefaults.IdCapture.IdCaptureOverlayDefaults.defaultLocalizedBrush.strokeColor, IdCaptureOverlay.idCaptureDefaults.IdCapture.IdCaptureOverlayDefaults.defaultLocalizedBrush.strokeWidth);
        this._defaultRejectedBrush = new scanditDatacaptureFrameworksCore.Brush(IdCaptureOverlay.idCaptureDefaults.IdCapture.IdCaptureOverlayDefaults.defaultRejectedBrush.fillColor, IdCaptureOverlay.idCaptureDefaults.IdCapture.IdCaptureOverlayDefaults.defaultRejectedBrush.strokeColor, IdCaptureOverlay.idCaptureDefaults.IdCapture.IdCaptureOverlayDefaults.defaultRejectedBrush.strokeWidth);
        this._capturedBrush = this._defaultCapturedBrush;
        this._localizedBrush = this._defaultLocalizedBrush;
        this._rejectedBrush = this._defaultRejectedBrush;
        this._frontSideTextHint = null;
        this._backSideTextHint = null;
    }
    setIdLayout(idLayout) {
        this._idLayout = idLayout;
        this.idCapture.controller.updateIdCaptureOverlay(this);
    }
    setFrontSideTextHint(text) {
        this._frontSideTextHint = text;
        this.idCapture.controller.updateIdCaptureOverlay(this);
    }
    setBackSideTextHint(text) {
        this._backSideTextHint = text;
        this.idCapture.controller.updateIdCaptureOverlay(this);
    }
    get idLayoutStyle() {
        return this._idLayoutStyle;
    }
    set idLayoutStyle(style) {
        this._idLayoutStyle = style;
        this.idCapture.controller.updateIdCaptureOverlay(this);
    }
    get idLayoutLineStyle() {
        return this._idLayoutLineStyle;
    }
    set idLayoutLineStyle(lineStyle) {
        this._idLayoutLineStyle = lineStyle;
        this.idCapture.controller.updateIdCaptureOverlay(this);
    }
    get capturedBrush() {
        return this._capturedBrush;
    }
    set capturedBrush(brush) {
        this._capturedBrush = brush;
        this.idCapture.controller.updateIdCaptureOverlay(this);
    }
    get localizedBrush() {
        return this._localizedBrush;
    }
    set localizedBrush(brush) {
        this._localizedBrush = brush;
        this.idCapture.controller.updateIdCaptureOverlay(this);
    }
    get rejectedBrush() {
        return this._rejectedBrush;
    }
    set rejectedBrush(brush) {
        this._rejectedBrush = brush;
        this.idCapture.controller.updateIdCaptureOverlay(this);
    }
    get defaultCapturedBrush() {
        return this._defaultCapturedBrush;
    }
    get defaultLocalizedBrush() {
        return this._defaultLocalizedBrush;
    }
    get defaultRejectedBrush() {
        return this._defaultRejectedBrush;
    }
    get textHintPosition() {
        return this._textHintPosition;
    }
    set textHintPosition(position) {
        this._textHintPosition = position;
        this.idCapture.controller.updateIdCaptureOverlay(this);
    }
    get showTextHints() {
        return this._showTextHints;
    }
    set showTextHints(enabled) {
        this._showTextHints = enabled;
        this.idCapture.controller.updateIdCaptureOverlay(this);
    }
}
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], IdCaptureOverlay.prototype, "idCapture", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], IdCaptureOverlay.prototype, "view", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.nameForSerialization('idLayout')
], IdCaptureOverlay.prototype, "_idLayout", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.nameForSerialization('idLayoutStyle')
], IdCaptureOverlay.prototype, "_idLayoutStyle", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.nameForSerialization('idLayoutLineStyle')
], IdCaptureOverlay.prototype, "_idLayoutLineStyle", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.nameForSerialization('textHintPosition')
], IdCaptureOverlay.prototype, "_textHintPosition", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.nameForSerialization('showTextHints')
], IdCaptureOverlay.prototype, "_showTextHints", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.nameForSerialization('capturedBrush')
], IdCaptureOverlay.prototype, "_capturedBrush", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.nameForSerialization('localizedBrush')
], IdCaptureOverlay.prototype, "_localizedBrush", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.nameForSerialization('rejectedBrush')
], IdCaptureOverlay.prototype, "_rejectedBrush", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.nameForSerialization('frontSideTextHint')
], IdCaptureOverlay.prototype, "_frontSideTextHint", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.nameForSerialization('backSideTextHint')
], IdCaptureOverlay.prototype, "_backSideTextHint", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], IdCaptureOverlay, "idCaptureDefaults", null);

class IdCaptureSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor() {
        super();
        this.properties = {};
        this.imageToResult = {};
        this.supportedDocuments = [];
        this.supportedSides = exports.SupportedSides.FrontOnly;
        this.anonymizationMode = IdCaptureSettings.idCaptureDefaults.IdCapture.IdCaptureSettings.anonymizationMode;
        this.rejectVoidedIds = IdCaptureSettings.idCaptureDefaults.IdCapture.IdCaptureSettings.rejectVoidedIds;
    }
    static get idCaptureDefaults() {
        return scanditDatacaptureFrameworksCore.FactoryMaker.getInstance('IdDefaults');
    }
    setProperty(name, value) {
        this.properties[name] = value;
    }
    getProperty(name) {
        return this.properties[name];
    }
    setShouldPassImageTypeToResult(type, shouldPass) {
        this.imageToResult[type] = shouldPass;
    }
    getShouldPassImageTypeToResult(type) {
        return this.imageToResult[type] || false;
    }
}
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], IdCaptureSettings, "idCaptureDefaults", null);

class AamvaBarcodeVerifier {
    constructor() {
        this.controller = new IdCaptureController();
    }
    static create(context) {
        const verifier = new AamvaBarcodeVerifier();
        return new Promise((resolve, reject) => {
            verifier
                .controller
                .createContextForBarcodeVerification(context)
                .then(() => {
                verifier.context = context;
                resolve(verifier);
            }, reject);
        });
    }
    verify(capturedId) {
        // Necessary for not exposing internal API on CapturedId, while only passing the private "json" property
        // to native iOS and Android.
        const capturedIdAsString = JSON.stringify(capturedId);
        const capturedIdJsonData = JSON.parse(capturedIdAsString).json;
        return new Promise((resolve, reject) => {
            this.controller
                .verifyCapturedIdAsync(JSON.stringify(capturedIdJsonData))
                .then((json) => {
                if (!json) {
                    resolve(AamvaBarcodeVerificationResult
                        .fromJSON(JSON.parse('{}')));
                }
                else {
                    resolve(AamvaBarcodeVerificationResult
                        .fromJSON(JSON.parse(json)));
                }
            }, reject);
        });
    }
}
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], AamvaBarcodeVerifier.prototype, "controller", void 0);

class AamvaVizBarcodeComparisonResult {
    get checksPassed() { return this.json.checksPassed; }
    get resultDescription() { return this.json.resultDescription; }
    get issuingCountryIsoMatch() {
        return StringComparisonCheck
            .fromJSON(this.json.issuingCountryIsoMatch);
    }
    get issuingJurisdictionIsoMatch() {
        return StringComparisonCheck
            .fromJSON(this.json.issuingJurisdictionIsoMatch);
    }
    get documentNumbersMatch() {
        return StringComparisonCheck
            .fromJSON(this.json.documentNumbersMatch);
    }
    get fullNamesMatch() {
        return StringComparisonCheck
            .fromJSON(this.json.fullNamesMatch);
    }
    get datesOfBirthMatch() {
        return DateComparisonCheck
            .fromJSON(this.json.datesOfBirthMatch);
    }
    get datesOfExpiryMatch() {
        return DateComparisonCheck
            .fromJSON(this.json.datesOfExpiryMatch);
    }
    get datesOfIssueMatch() {
        return DateComparisonCheck
            .fromJSON(this.json.datesOfIssueMatch);
    }
    get frontMismatchImage() {
        return this.json.frontMismatchImage;
    }
    static fromJSON(json) {
        const result = new AamvaVizBarcodeComparisonResult();
        result.json = json;
        return result;
    }
}

class AamvaVizBarcodeComparisonVerifier {
    constructor() {
        this.controller = new IdCaptureController();
    }
    static create() {
        return new AamvaVizBarcodeComparisonVerifier();
    }
    verify(capturedId) {
        // Necessary for not exposing internal API on CapturedId, while only passing the private "json" property
        // to native iOS and Android.
        const capturedIdAsString = JSON.stringify(capturedId);
        const capturedIdJsonData = JSON.parse(capturedIdAsString).json;
        return new Promise((resolve, reject) => {
            this.controller
                .verifyCapturedId(JSON.stringify(capturedIdJsonData))
                .then((json) => {
                if (!json) {
                    resolve(AamvaVizBarcodeComparisonResult
                        .fromJSON(JSON.parse('{}')));
                }
                else {
                    resolve(AamvaVizBarcodeComparisonResult
                        .fromJSON(JSON.parse(json)));
                }
            }, reject);
        });
    }
}
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], AamvaVizBarcodeComparisonVerifier.prototype, "controller", void 0);

exports.CapturedResultType = void 0;
(function (CapturedResultType) {
    CapturedResultType["AAMVABarcodeResult"] = "aamvaBarcodeResult";
    CapturedResultType["ArgentinaIdBarcodeResult"] = "argentinaIdBarcodeResult";
    CapturedResultType["ColombiaIdBarcodeResult"] = "colombiaIdBarcodeResult";
    CapturedResultType["ColombiaDlBarcodeResult"] = "colombiaDlBarcodeResult";
    CapturedResultType["MRZResult"] = "mrzResult";
    CapturedResultType["SouthAfricaDlBarcodeResult"] = "southAfricaDlBarcodeResult";
    CapturedResultType["SouthAfricaIdBarcodeResult"] = "southAfricaIdBarcodeResult";
    CapturedResultType["CommonAccessCardBarcodeResult"] = "commonAccessCardBarcodeResult";
    CapturedResultType["USUniformedServicesBarcodeResult"] = "usUniformedServicesBarcodeResult";
    CapturedResultType["USVisaVIZResult"] = "usVisaVizResult";
    CapturedResultType["VIZResult"] = "vizResult";
    CapturedResultType["ChinaMainlandTravelPermitMRZResult"] = "chinaMainlandTravelPermitMrzResult";
    CapturedResultType["ChinaExitEntryPermitMRZResult"] = "chinaExitEntryPermitMrzResult";
    CapturedResultType["ChinaOneWayPermitBackMrzResult"] = "chinaOneWayPermitBackMrzResult";
    CapturedResultType["ChinaOneWayPermitFrontMrzResult"] = "chinaOneWayPermitFrontMrzResult";
    CapturedResultType["ApecBusinessTravelCardMrzResult"] = "apecBusinessTravelCardMrzResult";
})(exports.CapturedResultType || (exports.CapturedResultType = {}));

exports.DocumentType = void 0;
(function (DocumentType) {
    DocumentType["None"] = "none";
    DocumentType["ConsularId"] = "consularId";
    DocumentType["DrivingLicense"] = "drivingLicense";
    DocumentType["DrivingLicensePublicServicesCard"] = "drivingLicensePublicServicesCard";
    DocumentType["EmploymentPass"] = "employmentPass";
    DocumentType["FinCard"] = "finCard";
    DocumentType["Id"] = "id";
    DocumentType["MultipurposeId"] = "multipurposeId";
    DocumentType["MyKad"] = "myKad";
    DocumentType["MyKid"] = "myKid";
    DocumentType["MyPR"] = "myPr";
    DocumentType["MyTentera"] = "myTentera";
    DocumentType["PanCard"] = "panCard";
    DocumentType["ProfessionalId"] = "professionalId";
    DocumentType["PublicServicesCard"] = "publicServicesCard";
    DocumentType["ResidencePermit"] = "residencePermit";
    DocumentType["ResidentId"] = "residentId";
    DocumentType["TemporaryResidencePermit"] = "temporaryResidencePermit";
    DocumentType["VoterId"] = "voterId";
    DocumentType["WorkPermit"] = "workPermit";
    DocumentType["IKad"] = "iKad";
    DocumentType["MilitaryId"] = "militaryId";
    DocumentType["MyKas"] = "myKas";
    DocumentType["SocialSecurityCard"] = "socialSecurityCard";
    DocumentType["HealthInsuranceCard"] = "healthInsuranceCard";
    DocumentType["Passport"] = "passport";
    DocumentType["DiplomaticPassport"] = "diplomaticPassport";
    DocumentType["ServicePassport"] = "servicePassport";
    DocumentType["TemporaryPassport"] = "temporaryPassport";
    DocumentType["Visa"] = "visa";
    DocumentType["SPass"] = "sPass";
    DocumentType["AddressCard"] = "addressCard";
    DocumentType["AlienId"] = "alienId";
    DocumentType["AlienPassport"] = "alienPassport";
    DocumentType["GreenCard"] = "greenCard";
    DocumentType["MinorsId"] = "minorsId";
    DocumentType["PostalId"] = "postalId";
    DocumentType["ProfessionalDl"] = "professionalDl";
    DocumentType["TaxId"] = "taxId";
    DocumentType["WeaponPermit"] = "weaponPermit";
    DocumentType["BorderCrossingCard"] = "borderCrossingCard";
    DocumentType["DriverCard"] = "driverCard";
    DocumentType["GlobalEntryCard"] = "globalEntryCard";
    DocumentType["MyPolis"] = "myPolis";
    DocumentType["NexusCard"] = "nexusCard";
    DocumentType["PassportCard"] = "passportCard";
    DocumentType["ProofOfAgeCard"] = "proofOfAgeCard";
    DocumentType["RefugeeId"] = "refugeeId";
    DocumentType["TribalId"] = "tribalId";
    DocumentType["VeteranId"] = "veteranId";
    DocumentType["CitizenshipCertificate"] = "citizenshipCertificate";
    DocumentType["MyNumberCard"] = "myNumberCard";
    DocumentType["MinorsPassport"] = "minorsPassport";
    DocumentType["MinorsPublicServicesCard"] = "minorsPublicServicesCard";
    DocumentType["AsylumRequest"] = "asylumRequest";
    DocumentType["DriverQualificationCard"] = "driverQualificationCard";
    DocumentType["ProvisionalDl"] = "provisionalDl";
    DocumentType["RefugeePassport"] = "refugeePassport";
    DocumentType["SpecialId"] = "specialId";
    DocumentType["UniformedServicesId"] = "uniformedServicesId";
    DocumentType["ImmigrantVisa"] = "immigrantVisa";
    DocumentType["ConsularVoterId"] = "consularVoterId";
    DocumentType["TwicCard"] = "twicCard";
    DocumentType["ExitEntryPermit"] = "exitEntryPermit";
    DocumentType["MainlandTravelPermitHongKongMacau"] = "mainlandTravelPermitHongKongMacau";
    DocumentType["MainlandTravelPermitTaiwan"] = "mainlandTravelPermitTaiwan";
    DocumentType["NbiClearance"] = "nbiClearance";
    DocumentType["ProofOfRegistration"] = "proofOfRegistration";
    DocumentType["TemporaryProtectionPermit"] = "temporaryProtectionPermit";
    DocumentType["MunicipalId"] = "municipalId";
    DocumentType["AfghanCitizenCard"] = "afghanCitizenCard";
    DocumentType["Eid"] = "eid";
    DocumentType["Pass"] = "pass";
    DocumentType["SisId"] = "sisId";
    DocumentType["MedicalMarijuanaCard"] = "medicalMarijuanaCard";
    DocumentType["AsicCard"] = "asicCard";
    DocumentType["BidoonCard"] = "bidoonCard";
    DocumentType["InterimHealthInsuranceCard"] = "interimHealthInsuranceCard";
    DocumentType["NonVoterId"] = "nonVoterId";
    DocumentType["ReciprocalHealthInsuranceCard"] = "reciprocalHealthInsuranceCard";
    DocumentType["VehicleRegistration"] = "vehicleRegistration";
})(exports.DocumentType || (exports.DocumentType = {}));

class VizMrzComparisonResult {
    get checksPassed() { return this.json.checksPassed; }
    get resultDescription() { return this.json.resultDescription; }
    get issuingCountryIsoMatch() {
        return VizMrzStringComparisonCheck
            .fromJSON(this.json.issuingCountryIsoMatch);
    }
    get documentNumbersMatch() {
        return VizMrzStringComparisonCheck
            .fromJSON(this.json.documentNumbersMatch);
    }
    get fullNamesMatch() {
        return VizMrzStringComparisonCheck
            .fromJSON(this.json.fullNamesMatch);
    }
    get datesOfBirthMatch() {
        return VizMrzDateComparisonCheck
            .fromJSON(this.json.datesOfBirthMatch);
    }
    get datesOfExpiryMatch() {
        return VizMrzDateComparisonCheck
            .fromJSON(this.json.datesOfExpiryMatch);
    }
    static fromJSON(json) {
        const result = new VizMrzComparisonResult();
        result.json = json;
        return result;
    }
}

class VizMrzComparisonVerifier {
    constructor() {
        this.controller = new IdCaptureController();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static create(context) {
        return new VizMrzComparisonVerifier();
    }
    verify(capturedId) {
        // Necessary for not exposing internal API on CapturedId, while only passing the private "json" property
        // to native iOS and Android.
        const capturedIdAsString = JSON.stringify(capturedId);
        const capturedIdJsonData = JSON.parse(capturedIdAsString).json;
        return new Promise((resolve, reject) => {
            this.controller
                .verifyVizMrz(JSON.stringify(capturedIdJsonData))
                .then((json) => {
                if (!json) {
                    resolve(VizMrzComparisonResult
                        .fromJSON(JSON.parse('{}')));
                }
                else {
                    resolve(VizMrzComparisonResult
                        .fromJSON(JSON.parse(json)));
                }
            }, reject);
        });
    }
}
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], VizMrzComparisonVerifier.prototype, "controller", void 0);

exports.AAMVABarcodeResult = AAMVABarcodeResult;
exports.AamvaBarcodeVerificationResult = AamvaBarcodeVerificationResult;
exports.AamvaBarcodeVerifier = AamvaBarcodeVerifier;
exports.AamvaVizBarcodeComparisonResult = AamvaVizBarcodeComparisonResult;
exports.AamvaVizBarcodeComparisonVerifier = AamvaVizBarcodeComparisonVerifier;
exports.ApecBusinessTravelCardMrzResult = ApecBusinessTravelCardMrzResult;
exports.ArgentinaIdBarcodeResult = ArgentinaIdBarcodeResult;
exports.CapturedId = CapturedId;
exports.ChinaExitEntryPermitMRZResult = ChinaExitEntryPermitMRZResult;
exports.ChinaMainlandTravelPermitMRZResult = ChinaMainlandTravelPermitMRZResult;
exports.ChinaOneWayPermitBackMrzResult = ChinaOneWayPermitBackMrzResult;
exports.ChinaOneWayPermitFrontMrzResult = ChinaOneWayPermitFrontMrzResult;
exports.ColombiaDlBarcodeResult = ColombiaDlBarcodeResult;
exports.ColombiaIdBarcodeResult = ColombiaIdBarcodeResult;
exports.CommonAccessCardBarcodeResult = CommonAccessCardBarcodeResult;
exports.CommonCapturedIdFields = CommonCapturedIdFields;
exports.DateComparisonCheck = DateComparisonCheck;
exports.DateResult = DateResult;
exports.IdCapture = IdCapture;
exports.IdCaptureController = IdCaptureController;
exports.IdCaptureError = IdCaptureError;
exports.IdCaptureFeedback = IdCaptureFeedback;
exports.IdCaptureListenerController = IdCaptureListenerController;
exports.IdCaptureOverlay = IdCaptureOverlay;
exports.IdCaptureSession = IdCaptureSession;
exports.IdCaptureSettings = IdCaptureSettings;
exports.LocalizedOnlyId = LocalizedOnlyId;
exports.MRZResult = MRZResult;
exports.ProfessionalDrivingPermit = ProfessionalDrivingPermit;
exports.RejectedId = RejectedId;
exports.SouthAfricaDlBarcodeResult = SouthAfricaDlBarcodeResult;
exports.SouthAfricaIdBarcodeResult = SouthAfricaIdBarcodeResult;
exports.StringComparisonCheck = StringComparisonCheck;
exports.USUniformedServicesBarcodeResult = USUniformedServicesBarcodeResult;
exports.USVisaVIZResult = USVisaVIZResult;
exports.VIZResult = VIZResult;
exports.VehicleRestriction = VehicleRestriction;
exports.VizMrzComparisonResult = VizMrzComparisonResult;
exports.VizMrzComparisonVerifier = VizMrzComparisonVerifier;
exports.VizMrzDateComparisonCheck = VizMrzDateComparisonCheck;
exports.VizMrzStringComparisonCheck = VizMrzStringComparisonCheck;
exports.getIdDefaults = getIdDefaults;
exports.loadIdDefaults = loadIdDefaults;
exports.parseIdDefaults = parseIdDefaults;
