{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://example.com/homestay.schema.json",
    "title": "Homestay Information",
    "description": "Schema for homestay details",
    "type": "object",
    "properties": {
        "identificationParticular": {
            "type": "object",
            "properties": {
                "urbanOrRural": { "type": "string" },
                "pvtOrGovt": { "type": "string" },
                "normalOrHeritage": { "type": "string" },
                "state": { "type": "string" },
                "district": { "type": "string" },
                "constituency": { "type": "string" },
                "villageOrTown": { "type": "string" },
                "munOrNPOrGPUOrWard": { "type": "string" },
                "address": { "type": "string" },
                "pinCode": { "type": "integer" }
            },
            "required": ["urbanOrRural", "pvtOrGovt", "state", "district", "address", "pinCode"]
        },
        "detailOfEstablishment": {
            "type": "object",
            "properties": {
                "homestayName": { "type": "string" },
                "owner": { "type": "string" },
                "emailId": { "type": "string" },
                "website": { "type": "string" },
                "phone": { "type": "integer" },
                "altPhone": { "type": "integer" },
                "gender": { "type": "string" },
                // Add other fields as needed
            },
            "required": ["homestayName", "owner", "phone"]
        },
        "activities": {
            "type": "object",
            "properties": {
                "localVillageTour": { "type": "array", "items": { "type": "string" } },
                "birdWatching": { "type": "array", "items": { "type": "string" } },
                "organicFarmVisit": { "type": "array", "items": { "type": "string" } },
                "anyOther": { "type": "array", "items": { "type": "string" } },
                "nearByAttraction": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": { "type": "string" },
                            "distance": { "type": "string" }
                        }
                    }
                }
            }
        },
        "otherFacilities": {
            "type": "object",
            "properties": {
                "transportFacilities": { "type": "string" },
                "accessibility": { "type": "string" },
                "isWasteDisposed": { "type": "boolean" },
                "isSafeDrinking": { "type": "boolean" },
                "isFirstAid": { "type": "boolean" },
                "isEcoFriendly": { "type": "boolean" },
                "isClean": { "type": "boolean" },
                "describe": { "type": "string" }
            }
        }
    }
}