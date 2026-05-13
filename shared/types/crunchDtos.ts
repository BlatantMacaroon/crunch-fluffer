import type { DatabaseMeta } from "./databaseMeta";

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

export interface Crunch extends CrunchDto, DatabaseMeta {}

export const Classes = {
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

export const Races = {
    Human: 'HUMAN',
    Dwarf: 'DWARF',
    Dragonborn: 'DRAGONBORN',
    Elf: 'ELF',
    HalfElf: 'HALF-ELF',
    Halfling: 'HALFLING',
    Gnome: 'GNOME',
    HalfOrc: 'HALF-ORC',
    Eladrin: 'ELADRIN'
} as const;

export type Class = typeof Classes[keyof typeof Classes];
export type Race = typeof Races[keyof typeof Races];

export interface CrunchArgs {
    classes?: Class[];
}