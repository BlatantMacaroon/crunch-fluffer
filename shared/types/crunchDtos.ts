export interface CrunchDto {
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
    class: Class,
    race: Race,
    level: number
}

export const Class = {
    Fighter: 'FIGHTER',
    Ranger: 'RANGER',
    Paladin: 'PALADIN',
    Druid: 'DRUID',
    Barbarian: 'BARBARIAN',
    Monk: 'MONK',
    Bard: 'BARD',
    Wizard: 'WIZARD',
    Sorcerer: 'SORCERER',
    Cleric: 'CLERIC',
    Rogue: 'ROGUE'
} as const;

export const Race = {
    Human: 'HUMAN',
    Dwarf: 'DWARF',
    Dragonborn: 'DRAGONBORN',
    Elf: 'ELF',
    HalfElf: 'HALF-ELF',
    Halfling: 'HALFLING',
    Gnome: 'GNOME'
} as const;

export type Class = typeof Class[keyof typeof Class];
export type Race = typeof Race[keyof typeof Race];

export interface CrunchArgs {
    classes?: Class[];
}