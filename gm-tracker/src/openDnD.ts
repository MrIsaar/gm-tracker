
// const apiURIbase = "https://api.open5e.com/"
const apiURIMon = "https://api.open5e.com/monsters/"
const apiURICondition = "https://api.open5e.com/conditions/"
const apiURIallMonName = "https://api.open5e.com/monsters/?format=json&fields=slug,name,cr&limit=1000&document__slug=wotc-srd"


export interface basicStats{
    name:string;
    maxHp:number;
    ac:number; 
    pp: number;
    notes:string
}


export async function getConditionList() : Promise<any[]>
{
    const apiRes = await fetch(apiURICondition);
    const conList = await apiRes.json();
    console.log(conList);
    console.log(conList.count);
    return conList.results;
}
export async function getMonsterList() : Promise<any[]>
{
    const apiRes = await fetch(apiURIallMonName);
    const monList = await apiRes.json();
    console.log(monList);
    console.log(monList.count);
    let mons = [{"slug" : "", "name" : "Monster"}];
    return mons.concat(monList.results);
}

export async function getMonsterStats(name:string) : Promise<MonsterStat | null>{
    if(name == null || name == "")
        return null;
    console.log(`requesting monster: ${name}`);
    const recentMonName : string | null = localStorage.getItem("recentMonsterName");
    if(recentMonName != null && recentMonName == name)
    {
      console.log("Using cached monster");
      const recentMon : string | null = localStorage.getItem("recentMonster");
      if (recentMon != null && recentMon != "")
        return JSON.parse( recentMon);
      else
        console.log("Cached monster empty. Using API");
    }
    const apiRes = await fetch(apiURIMon + name);
    const monster = await apiRes.json();
    console.log(monster);
    if(monster != null)
    {
        localStorage.setItem("recentMonsterName", name);
        localStorage.setItem("recentMonster", JSON.stringify(monster));
    }
    return monster;
}

export function getBasicStats(monster: MonsterStat | null) : basicStats{
    if(monster == null)
        return {name:"Monster", maxHp:0, ac:10, pp:10, notes:""};
    const perceptionMod = monster.perception ?? monster.skills?.perception ?? Math.floor((monster.wisdom - 10) / 2) ?? 0;
    const pp = perceptionMod + 10;
    const basic = {
        name: monster.name,
        maxHp:monster.hit_points,
        ac:monster.armor_class,
        pp: pp,
        notes:""
    }
    console.log("Mon -> Basic");
    console.log(monster);
    console.log(basic);
    return basic;
}


  
  export interface MonsterStat {
    slug: string
    desc: string
    name: string
    size: string
    type: string
    subtype: string
    group?: string
    alignment: string
    armor_class: number
    armor_desc?: string
    hit_points: number
    hit_dice: string
    speed: Speed
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
    strength_save?: number
    dexterity_save?: number
    constitution_save?: number
    intelligence_save?: number
    wisdom_save?: number
    charisma_save?: number
    perception?: number
    skills: Skills
    damage_vulnerabilities: string
    damage_resistances: string
    damage_immunities: string
    condition_immunities: string
    senses: string
    languages: string
    challenge_rating: string
    cr: number
    actions?: Action[]
    bonus_actions: any
    reactions?: Reaction[]
    legendary_desc: string
    legendary_actions?: LegendaryAction[]
    special_abilities?: SpecialAbility[]
    spell_list: string[]
    page_no: number
    environments: string[]
    img_main?: string
    document__slug: string
    document__title: string
    document__license_url: string
    document__url: string
  }
  
  export interface Speed {
    walk?: number
    swim?: number
    fly?: number
    burrow?: number
    climb?: number
    hover?: boolean
    notes?: string
  }
  
  export interface Skills {
    history?: number
    perception?: number
    medicine?: number
    religion?: number
    stealth?: number
    persuasion?: number
    insight?: number
    deception?: number
    arcana?: number
    athletics?: number
    acrobatics?: number
    survival?: number
    investigation?: number
    nature?: number
    intimidation?: number
    performance?: number
  }
  
  export interface Action {
    name: string
    desc: string
    attack_bonus?: number
    damage_dice?: string
    damage_bonus?: number
  }
  
  export interface Reaction {
    name: string
    desc: string
  }
  
  export interface LegendaryAction {
    name: string
    desc: string
    attack_bonus?: number
    damage_dice?: string
  }
  
  export interface SpecialAbility {
    name: string
    desc: string
    attack_bonus?: number
    damage_dice?: string
  }
  
  
// function parseMon (preset) {
//     // Name and type
//     mon.name = preset.name.trim();
//     mon.size = preset.size.trim().toLowerCase();
//     mon.type = preset.type.trim();
//     mon.tag = preset.subtype.trim();
//     mon.alignment = preset.alignment.trim();

//     // Stats
//     mon.strPoints = preset.strength;
//     mon.dexPoints = preset.dexterity;
//     mon.conPoints = preset.constitution;
//     mon.intPoints = preset.intelligence;
//     mon.wisPoints = preset.wisdom;
//     mon.chaPoints = preset.charisma;

//     // CR
//     mon.cr = preset.challenge_rating;
//     mon.customCr = CrFunctions.GetString();
//     mon.customProf = CrFunctions.GetProf();

//     // Armor Class
//     let armorAcData = preset.armor_class,
//         armorDescData = preset.armor_desc ? preset.armor_desc.split(",") : null;

//     // What type of armor do we have? If it doesn't match anything, use "other"
//     mon.shieldBonus = 0;
//     if (armorDescData) {
//         mon.armorName = armorDescData[0];
//         // If we have a shield and nothing else
//         if (armorDescData.length == 1 && armorDescData[0].trim() == "shield") {
//             mon.shieldBonus = 2;
//             mon.armorName = "none";
//         } else {
//             // If we have a shield in addition to something else
//             if (armorDescData.length > 1) {
//                 if (armorDescData[1].trim() == "shield") {
//                     mon.shieldBonus = 2;
//                     mon.armorName = armorDescData[0];
//                 }
//                 // Or if it's just weird
//                 else
//                     armorDescData = [armorDescData.join(",")];
//             }

//             // Is it natural armor?
//             if (mon.armorName == "natural armor") {
//                 let natArmorBonusCheck = armorAcData - MathFunctions.GetAC("none");
//                 if (natArmorBonusCheck > 0)
//                     mon.natArmorBonus = natArmorBonusCheck;

//                 // Weird edge case where the monster has a natural armor bonus of <= 0
//                 else
//                     mon.armorName = "other";
//             }

//             // Is it another type of armor we know?
//             else if (data.armors.hasOwnProperty(armorDescData[0].trim()))
//                 mon.armorName = armorDescData[0].trim();

//             // Is it mage armor?
//             else if (mon.armorName.includes("mage armor"))
//                 mon.armorName = "mage armor";

//             // We have no idea what this armor is
//             else
//                 mon.armorName = "other";
//         }
//     } else
//         mon.armorName = (armorAcData == MathFunctions.GetAC("none") ? "none" : "other");

//     // In case it's an unknown armor type
//     if (mon.armorName == "other") {
//         if (armorDescData)
//             mon.otherArmorDesc = armorDescData[0].includes("(") ? armorDescData :
//                 armorAcData + " (" + armorDescData + ")";
//         else
//             mon.otherArmorDesc = armorAcData + " (unknown armor type)";

//         // Set the nat armor bonus for convenience- often the AC is for natural armor, but doesn't have it in the armor description
//         let natArmorBonusCheck = armorAcData - MathFunctions.GetAC("none");

//         if (natArmorBonusCheck > 0)
//             mon.natArmorBonus = natArmorBonusCheck;
//     } else
//         mon.otherArmorDesc = armorAcData + (preset.armor_desc ? " (" + preset.armor_desc + ")" : "");

//     // Hit Dice
//     mon.hitDice = parseInt(preset.hit_dice.split("d")[0]);
//     mon.hpText = mon.hitDice.toString();
//     mon.customHP = false;

//     // Speeds
//     let GetSpeed = (speedList, speedType) => speedList.hasOwnProperty(speedType) ? parseInt(speedList[speedType]) : 0;

//     mon.speed = GetSpeed(preset.speed, "walk");
//     mon.burrowSpeed = GetSpeed(preset.speed, "burrow");
//     mon.climbSpeed = GetSpeed(preset.speed, "climb");
//     mon.flySpeed = GetSpeed(preset.speed, "fly");
//     mon.swimSpeed = GetSpeed(preset.speed, "swim");
//     mon.hover = preset.speed.hasOwnProperty("hover");

//     if (preset.speed.hasOwnProperty("notes")) {
//         mon.customSpeed = true;
//         mon.speedDesc = preset.speed.walk + " ft. (" + preset.speed.notes + ")";
//     } else {
//         mon.customSpeed = false;
//         mon.speedDesc = StringFunctions.GetSpeed();
//     }

//     // Saving Throws
//     mon.sthrows = [];
//     if (preset.strength_save)
//         this.AddSthrow("str");
//     if (preset.dexterity_save)
//         this.AddSthrow("dex");
//     if (preset.constitution_save)
//         this.AddSthrow("con");
//     if (preset.intelligence_save)
//         this.AddSthrow("int");
//     if (preset.wisdom_save)
//         this.AddSthrow("wis");
//     if (preset.charisma_save)
//         this.AddSthrow("cha");

//     // Skills
//     mon.skills = [];
//     if (preset.skills) {
//         for (let index = 0; index < data.allSkills.length; index++) {
//             let currentSkill = data.allSkills[index],
//                 skillCheck = StringFunctions.StringReplaceAll(currentSkill.name.toLowerCase(), " ", "_");
//             if (preset.skills[skillCheck]) {
//                 let expectedExpertise = MathFunctions.PointsToBonus(mon[currentSkill.stat + "Points"]) + Math.ceil(CrFunctions.GetProf() * 1.5),
//                     skillVal = preset.skills[skillCheck];
//                 this.AddSkill(data.allSkills[index].name, (skillVal >= expectedExpertise ? " (ex)" : null));
//             }
//         }
//     }

//     // Conditions
//     mon.conditions = [];
//     let conditionsPresetArr = ArrayFunctions.FixPresetArray(preset.condition_immunities);
//     for (let index = 0; index < conditionsPresetArr.length; index++)
//         this.AddCondition(conditionsPresetArr[index]);

//     // Damage Types
//     mon.damagetypes = [];
//     mon.specialdamage = [];
//     this.AddPresetDamage(preset.damage_vulnerabilities, "v");
//     this.AddPresetDamage(preset.damage_resistances, "r");
//     this.AddPresetDamage(preset.damage_immunities, "i");

//     // Languages
//     mon.languages = [];
//     mon.telepathy = 0;
//     mon.understandsBut = "";
//     if (preset.languages.includes("understands")) {
//         let speaksUnderstandsArr = preset.languages.split("understands"),
//             speaks = speaksUnderstandsArr[0].length > 0 ? speaksUnderstandsArr[0].trim().split(",") : [],
//             understands = speaksUnderstandsArr[1].split(" but "),
//             understandsLangs = understands[0].replace(", and ", ",").replace(" and ", ",").split(","),
//             understandsBut = understands.length > 1 ? understands[1].trim() : "";

//         for (let index = 0; index < speaks.length; index++)
//             this.AddLanguage(speaks[index], true);
//         for (let index = 0; index < understandsLangs.length; index++)
//             this.AddLanguage(understandsLangs[index], false);

//         if (understandsBut.toLowerCase().includes("telepathy")) {
//             mon.telepathy = parseInt(understandsBut.replace(/\D/g, ''));
//             understandsBut = understandsBut.substr(0, understandsBut.lastIndexOf(","));
//         }
//         mon.understandsBut = understandsBut;
//     }
//     else {
//         let languagesPresetArr = preset.languages.split(",");
//         for (let index = 0; index < languagesPresetArr.length; index++) {
//             let languageName = languagesPresetArr[index].trim();
//             languageName.toLowerCase().includes("telepathy") ?
//                 mon.telepathy = parseInt(languageName.replace(/\D/g, '')) :
//                 this.AddLanguage(languageName, true);
//         }
//     }

//     // Senses
//     mon.blindsight = 0;
//     mon.blind = false;
//     mon.darkvision = 0;
//     mon.tremorsense = 0;
//     mon.truesight = 0;
//     let sensesPresetArr = preset.senses.split(",");
//     for (let index = 0; index < sensesPresetArr.length; index++) {
//         let senseString = sensesPresetArr[index].trim().toLowerCase(),
//             senseName = senseString.split(" ")[0],
//             senseDist = StringFunctions.GetNumbersOnly(senseString);
//         switch (senseName) {
//             case "blindsight":
//                 mon.blindsight = senseDist;
//                 mon.blind = senseString.toLowerCase().includes("blind beyond");
//                 break;
//             case "darkvision":
//                 mon.darkvision = senseDist;
//                 break;
//             case "tremorsense":
//                 mon.tremorsense = senseDist;
//                 break;
//             case "truesight":
//                 mon.truesight = senseDist;
//                 break;
//         }
//     }

//     // This
//     mon.shortName = "";
//     mon.pluralName = "";

//     // Legendary?
//     mon.isLegendary = Array.isArray(preset.legendary_actions);
//     if (preset.legendary_desc == null || preset.legendary_desc.length == 0)
//         this.LegendaryDescriptionDefault();
//     else
//         mon.legendariesDescription = preset.legendary_desc;
//     FormFunctions.SetLegendaryDescriptionForm();

//     // Mythic?
//     mon.isMythic = Array.isArray(preset.mythic_actions);
//     if (preset.mythicy_desc == null || preset.mythic_desc.length == 0)
//         this.MythicDescriptionDefault();
//     else
//         mon.legendariesDescription = preset.mythic_desc;
//     FormFunctions.SetMythicDescriptionForm();

//     // Lair?
//     mon.isLair = Array.isArray(preset.lair_actions);
//     if (preset.lair_desc == null || preset.lair_desc.length == 0) {
//         this.LairDescriptionDefault();
//         this.LairDescriptionEndDefault();
//     }
//     else {
//         mon.lairDescription = preset.lair_desc;
//         mon.lairDescriptionEnd = preset.lair_desc_end;
//     }
//     FormFunctions.SetLairDescriptionForm();

//     // Regional Effects?
//     mon.isRegional = Array.isArray(preset.regional_actions);
//     if (preset.regional_desc == null || preset.regional_desc.length == 0) {
//         this.RegionalDescriptionDefault();
//         this.RegionalDescriptionEndDefault();
//     }
//     else {
//         mon.regionalDescription = preset.regional_desc;
//         mon.regionalDescriptionEnd = preset.regional_desc_end;
//     }
//     FormFunctions.SetRegionalDescriptionForm();
//     FormFunctions.SetRegionalDescriptionEndForm();

//     // Abilities
//     mon.abilities = [];
//     mon.actions = [];
//     mon.bonusActions = [];
//     mon.reactions = [];
//     mon.legendaries = [];
//     mon.mythics = []
//     mon.lairs = [];
//     mon.regionals = [];
//     let abilitiesPresetArr = preset.special_abilities,
//         actionsPresetArr = preset.actions,
//         bonusActionsPresetArr = preset.bonusActions,
//         reactionsPresetArr = preset.reactions,
//         legendariesPresetArr = preset.legendary_actions,
//         mythicPresetArr = preset.mythic_actions,
//         lairsPresetArr = preset.lair_actions,
//         regionalsPresetArr = preset.regional_actions;

//     let self = this,
//         AbilityPresetLoop = function (arr, name) {
//             if (Array.isArray(arr)) {
//                 for (let index = 0; index < arr.length; index++)
//                     self.AddAbilityPreset(name, arr[index]);
//             }
//         }

//     AbilityPresetLoop(abilitiesPresetArr, "abilities");
//     AbilityPresetLoop(actionsPresetArr, "actions");
//     AbilityPresetLoop(bonusActionsPresetArr, "bonusActions");
//     AbilityPresetLoop(reactionsPresetArr, "reactions");
//     if (mon.isLegendary)
//         AbilityPresetLoop(legendariesPresetArr, "legendaries");
//     if (mon.isMythic)
//         AbilityPresetLoop(mythicPresetArr, "mythics");
//     if (mon.isLair)
//         AbilityPresetLoop(lairsPresetArr, "lairs");
//     if (mon.isRegional)
//         AbilityPresetLoop(regionalsPresetArr, "regionals");

//     mon.separationPoint = undefined; // This will make the separation point be automatically calculated in UpdateStatblock
// }