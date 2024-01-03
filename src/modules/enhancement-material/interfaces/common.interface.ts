import { EMaterialRarity } from "../../../core/enums/material-rarity.enum";
import { $Enums } from ".prisma/client";
import { EEnhancementMaterialType } from "../../../core/enums/enhancement-material-type.enum.type";

export interface IEnhancementMaterial {
	id: string;
	name: {
		en: string;
		ua: string;
		ru: string;
	};
	description: {
		en: string;
		ua: string;
		ru: string;
	};
	type: EEnhancementMaterialType;
	rarity: EMaterialRarity;
	icon: string;
}

export interface IEnhancementMaterialCreate {
	nameEn: string;
	nameUa: string;
	nameRu: string;
	descriptionEn: string;
	descriptionUa: string;
	descriptionRu: string;
	type: $Enums.EnhancementMaterialType;
	rarity: $Enums.MaterialRarity;
	icon: string;
}

export interface IDeletedEnhancementMaterial {
	id: string;
}