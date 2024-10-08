import { z } from "zod"

const ARCHETYPES = [
    "Alien",
    "Infernoble Arms",
    "Noble Knight",
    "Melodious",
    "Archfiend",
    "Elemental HERO",
    "Umi",
    "ABC",
    "A-to-Z",
    "A.I.",
    "@Ignister",
    "Unchained",
    "Signature move",
    "Gem-",
    "Rokket",
    "Abyss Actor",
    "Abyss Script",
    "Abyss-",
    "Mermail",
    "Stardust",
    "Synchron",
    "Photon",
    "Code Talker",
    "Hole",
    "Magician",
    "Despia",
    "Adamancipator",
    "Advanced Crystal Beast",
    "Crystal Beast",
    "Heraldic",
    "Mecha Phantom Beast",
    "Aether",
    "Empower",
    "Blackwing",
    "Exchange of the Spirit",
    "Sky Striker",
    "Ninja",
    "Parshath",
    "Magistus",
    "Branded",
    "Albaz Dragon",
    "Ogdoadic",
    "Invoked",
    "Rescue-ACE",
    "Zera",
    "Lady of Lament",
    "Burning Abyss",
    "-Eyes Dragon",
    "Alligator",
    "Allure Queen",
    "Harpie",
    "Ally of Justice",
    "Mystical Beast of the Forest",
    "Magnet Warrior",
    "Sylvan",
    "Altergeist",
    "Nordic",
    "Attraction",
    "Amazement",
    "Amazoness",
    "Roid",
    "Venom",
    "Spellbook",
    "Dracoverlord",
    "Amorphage",
    "Bugroth",
    "Dark Magician",
    "Six Samurai",
    "Egyptian God",
    "Flamvell",
    "Fusion",
    "Ancient Gear",
    "Ancient Warriors",
    "Sphinx",
    "Fairy",
    "Trap Monster",
    "Noble Arms",
    "Vaalmonica",
    "Monarch",
    "Kuriboh",
    "Anti",
    "Apodrakosis",
    "Apoqliphort",
    "Vision HERO",
    "Magician Girl",
    "Valkyrie",
    "Appliancer",
    "Madoor",
    "Aquaactress",
    "Gishki",
    "Mikanko",
    "White",
    "Arcana Force",
    "Knight",
    "Assault Mode",
    "Nemeses",
    "Labrynth",
    "Nekroz",
    "Ghoti",
    "Gaia The Fierce Knight",
    "Vaylantz",
    "Armed Dragon",
    "Neos",
    "Chaos Phantom",
    "Sacred Beast",
    "Inzektor",
    "Ninjitsu Art",
    "Cyber Dragon",
    "Xyz",
    "Genex",
    "Empowered Warrior",
    "Aroma",
    "Guardian",
    "Artifact",
    "Ashened",
    "Ancient Treasure",
    "Darklord",
    "White Forest",
    "Utopic",
    "Metaphys",
    "X-Saber",
    "Atlantean",
    "Scrap",
    "Cyber",
    "World Chalice",
    "Lightsworn",
    "Charmer",
    "Koa'ki Meiru",
    "Greed",
    "Vendread",
    "World Legacy",
    "Nephthys",
    "Crystal",
    "Possessed",
    "Azamina",
    "Worm",
    "B.E.S.",
    "Spider",
    "Goblin",
    "Nouvelles",
    "Trap Hole",
    "Barian's",
    "Naturia",
    "Fleur",
    "Train",
    "Voiceless Voice",
    "Resonator",
    "Rose",
    "Evil Eye",
    "Batteryman",
    "Battleguard",
    "Battlewasp",
    "Battlin' Boxer",
    "Battlin' Boxing",
    "Yang Zing",
    "Blue-Eyes",
    "Barbaros",
    "Pendulum Dragon",
    "Chimera",
    "Fur Hire",
    "Frog",
    "Beetrooper",
    "Black Luster Soldier",
    "Dark World",
    "Fortune Lady",
    "Vassal",
    "Tenyi",
    "Pendulum",
    "Koala",
    "Rose Dragon",
    "Prediction Princess",
    "Red-Eyes",
    "Eyes Restrict",
    "Plunder Patroll",
    "Bounzer",
    "Cubic",
    "Blaze Accelerator",
    "Gusto",
    "Ice Barrier",
    "Duston",
    "Butterspy",
    "Toon",
    "Penguin",
    "Bonding",
    "Book of",
    "Meklord",
    "Boot-Up",
    "Gadget",
    "Borrel",
    "Demise",
    "Adventurer Token",
    "Tistina",
    "Bamboo Sword",
    "Fire Fist",
    "Performage",
    "Bujin",
    "Laval",
    "Salamangreat",
    "Chemicritter",
    "Destruction Sword",
    "Butterfly",
    "Bystial",
    "Earthbound",
    "Cataclysmic",
    "Junk",
    "Celtic Guard",
    "Centur-Ion",
    "Dragonmaid",
    "Slime",
    "Chaos",
    "Gravekeeper's",
    "SPYRAL",
    "Recipe",
    "Zefra",
    "Chronomaly",
    "Chrysalis",
    "Cipher",
    "Fire King",
    "Magikey",
    "Clear",
    "Clear Wing",
    "Destiny HERO",
    "Cloudian",
    "Codebreaker",
    "Gladiator Beast",
    "Performapal",
    "Machina",
    "Neo-Spacian",
    "Gimmick Puppet",
    '"C"',
    "Golden Land",
    "Constellar",
    "Dark Contract",
    "Exodia",
    "Void",
    "Majestic",
    "Shark",
    "Umbral Horror",
    "Cosmic Synchro Monster",
    "Jinzo",
    "Infernoble Knight",
    "Impcantation",
    "Vampire",
    "Endymion",
    "Crusadia",
    "Krawler",
    "Crystron",
    "Cupid",
    "Curse of Dragon",
    "Mask",
    "Shaddoll",
    "Eldlich",
    "CXyz",
    "Djinn",
    "Cyber Angel",
    "Cyberdark",
    "Rikka",
    "Circular",
    "Cynet",
    "D.D.",
    "D/D",
    "Mayakashi",
    "Danger!",
    "Frightfur",
    "Dark counterpart",
    "Light and Darkness Dragon",
    "Grepher",
    "Shining Sarcophagus",
    "Spirit Message",
    "Dark Scorpion",
    "Simorgh",
    "Tellarknight",
    "Herald",
    "Deep Sea",
    "Edge Imp",
    "Deskbot",
    "Legendary Knight",
    "Diabellstar",
    "Dice",
    "Digital Bug",
    "Galaxy-Eyes",
    "Orcust",
    "Dinomist",
    "True Draco",
    "Dracoslayer",
    "Dinomorphia",
    "Dinowrestler",
    "Divine Dragon",
    "Wicked God",
    "Aesir",
    "Snake-Eye",
    "Mist Valley",
    "Yosenju",
    "Dododo",
    "Kozmo",
    "Dogmatika",
    "Kaiju",
    "Doll",
    "Doll Monster",
    "Doodle Beast",
    "Doodlebook",
    "Doriado",
    "Solfachord",
    "Power Tool",
    "Generaider",
    "Dragunity",
    "roid",
    "Draconia",
    "Dream Mirror",
    "Nemurelia",
    "Nemleria",
    "Parasite",
    "Drytron",
    "Dual Avatar",
    "Horus",
    "Elementsaber",
    "Gate Guardian",
    "Emblema",
    "Maju",
    "Timelord",
    "Neo Space",
    "Morganite",
    "Metalmorph",
    "Purrely",
    "Favorite",
    "Tindangle",
    "Evil HERO",
    "Evil★Twin",
    "Lswarm",
    "Steelswarm",
    "Evoltile",
    "Evolsaur",
    "Evol",
    "Evolzar",
    "Raizeol",
    "Exosister",
    "Exodd",
    "Infernoid",
    "F.A.",
    "Fabled",
    "Polymerization",
    "Morphtronic",
    "Fairy Tail",
    "The Sanctuary in the Sky",
    "Shiranui",
    "Contact",
    "Millennium",
    "Fiendsmith",
    "Flame Swordsman",
    "Volcanic",
    "Fire Formation",
    "Firewall",
    "Celebration",
    "Infestation",
    "Fishborg",
    "Skull Servant",
    "Fossil",
    "Floowandereeze",
    "Flower Cardian",
    "Fluffal",
    "Aquamirror",
    "Forbidden",
    "Masked HERO",
    "Fortune Fairy",
    "Runick",
    "Metalfoes",
    "Utopia",
    "G Golem",
    "Gagaga",
    "P.U.N.K.",
    "Gaia Knight",
    "Galaxy",
    "Gandora",
    "Geargia",
    "Mathmech",
    "Underworld",
    "Ghostrick",
    "Star",
    "Spright",
    "Mekk-Knight",
    "Gizmek",
    "Glacial Beast",
    "Golden Castle of Stromberg",
    "Gogogo",
    "Gold Pride",
    "Karakuri",
    "Super Defense Robot",
    "Gorgonic",
    "Gouki",
    "Spiritual Art",
    "Elemental Lord",
    "GranSolfachord",
    "Graydle",
    "Jar",
    "Predaplant",
    "Wedju",
    "Guardragon",
    "Counter Fairy",
    "Gunkan",
    "Martial Art Spirit",
    "Hazy",
    "Infinitrack",
    "Heraldry",
    "HERO",
    "Heroic",
    "Hi-Speedroid",
    "Speedroid",
    "Hieratic",
    "Priestess",
    "Roland",
    "Horus the Black Flame Dragon",
    "Rank-Up-Magic",
    "Icejade",
    "Windwitch",
    "Igknight",
    "Zombie counterpart",
    "Primoredial",
    "Infernity",
    "Iron Chain",
    "Jester",
    "Melffy",
    "Jurrac",
    "Kairyu-Shin",
    "Kashtira",
    "Heart",
    "Paladins of Dragons",
    "Knightmare",
    "Labyrinth Wall",
    "Ojama",
    "Qli",
    "Wind-Up",
    "Libromancer",
    "Lil-la",
    "Live☆Twin",
    "Ki-sikil",
    "Lunalight",
    "Lyrilusc",
    "Machine Angel",
    "Madolche",
    "Magical Musket",
    "Blue Tears",
    "Majespecter",
    "Hyperion",
    "Malefic",
    "Malicevorous",
    "Mannadium",
    "Marincess",
    "The Agent",
    "Materiactor",
    "Megalith",
    "Memento",
    "Man-Eater Bug",
    "Mimighoul",
    "Supreme King",
    "Mirror Trap",
    "Mokey Mokey",
    "From the Underworld",
    "Mulcharmy",
    "Attribute Summoner",
    "Mythical Beast",
    "Myutant",
    "Super Quant",
    "Nimble",
    "Number",
    "Numeron",
    "Star Seraph",
    "Odd-Eyes",
    "Onomat",
    "Overlay",
    "Phantasm Spiral",
    "Paleozoic",
    "Patissciel",
    "Broken World",
    "Phantasm",
    "Phantom Knights",
    "Prank-Kids",
    "with Eyes of Blue",
    "Predap",
    "Scareclaw",
    "Puppet",
    "PSY-Frame",
    "Ragnaraika",
    "Raidraptor",
    "Rainbow Bridge",
    "Seventh",
    "Potan",
    "Reptilianne",
    "Rescue Squad",
    "Synchro",
    "Risebell",
    "Ritual Beast",
    "Vanquish Soul",
    "S-Force",
    "Relinquished",
    "Salamandra",
    "Sangen",
    "Stellarknight",
    "tellarknight",
    "Scrap-Iron",
    "Sea Stealth",
    "Secret Six Samurai",
    "Shinobird",
    "T.G.",
    "Silent Magician",
    "Silent Swordsman",
    "Sinful Spoils",
    "Six Strike",
    "Felgrand",
    "Skilled Magician",
    "Sky Scourge",
    "Schoolwork Success",
    "Solemn",
    "Prophecy",
    "Yubel",
    "Springans",
    "Starliege",
    "Starry Knight",
    "Holy Knight",
    "Stealth Kragen",
    "Subterror",
    "Sunavalon",
    "Sunseed",
    "Sunvine",
    "Superheavy",
    "Superheavy Samurai",
    "Swarm of",
    "Swordsoul",
    "Symphonic Warrior",
    "Tachyon",
    "Tearlaments",
    "Tenpai Dragon",
    "Toy",
    "Uniform Nomenclature",
    "The Weather",
    "Therion",
    "Thunder Dragon",
    "Time Thief",
    "Transcendosaurus",
    "Traptrix",
    "Tri-Brigade",
    "Triamid",
    "Trickstar",
    "U.A.",
    "Ursarctic",
    "Field Searcher",
    "Veda",
    "Vernusylph",
    "Virtual World",
    "Visas",
    "Vylon",
    "War Rock",
    "Watt",
    "Wight",
    "Witchcrafter",
    "Zexal",
    "Zoodiac",
    "Saber",
    "None",
] as const

// enum of ARCHETYPES

const ArchetypeSchema = z.enum(ARCHETYPES, { message: "Invalid Archetype" })

export default ArchetypeSchema
