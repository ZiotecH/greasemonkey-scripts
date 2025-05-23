var DBTools = new Object

/**
 * @type {boolean}
 */
DBTools.Halt = true

/**
 * @type {integer}
 */
DBTools.GlobalTimer = 1000

/**
 * @type {boolean}
 */
DBTools.Debug = false

/**
 * @type {integer}
 */
DBTools.Precision = 3
/**
 * @type {boolean}
 */
DBTools.Initiated = false

/**
* @returns {void}
*/
DBTools.Init = function () {
    DBTools.Utils.resource_init()
    DBTools.Utils.tab_init()
    DBTools.Initiated = true
}

DBTools.Utils = {
    /**
    * @param {*} input_value
    * @param {boolean} strict
    * @param {*} return_value
    * @returns {*}
    */
    NullCheck: function (input_value, strict, return_value) {

        if (null === strict || undefined === strict) { strict = false }
        if (null === return_value || undefined === return_value) { return_value = false }

        if (null === input_value || undefined === input_value) {
            if (strict) { return true }
            else { return return_value }
        }
        else {
            if (strict) { return false }
            else { return input_value }
        }
    },

    /**
    * @param {*} input_value
    * @param {boolean} strict
    * @param {boolean} return_value
    * @returns {boolean}
    */
    BoolCheck: function (input_value, strict, return_value) {
        //console.log(`BoolCheck (PRE): ${input_value}, ${strict}, ${return_value}`)

        input_value = this.NullCheck(input_value, false, return_value)
        return_value = this.NullCheck(return_value, false, false)
        strict = this.NullCheck(strict, false, false)

        //console.log(`BoolCheck (POST): ${input_value}, ${strict}, ${return_value}`)

        if (typeof (input_value) == 'boolean') {
            if (strict) { return true }
            else { return input_value }
        }

        else if (typeof (input_value) == 'string') {
            if (input_value == "true") { return true }
            else { return false }
        }

        else if (typeof (input_value) == 'number') {
            if (input_value >= 1) { return true }
            else { return false }
        }

        else { return return_value }
    },

    /**
    * @param {*} input_value
    * @param {boolean} strict
    * @param {number} return_value
    * @param {boolean} self_call
    * @returns {number}
    */
    NumCheck: function (input_value, strict, return_value, self_call) {
        self_call = this.NullCheck(self_call, false, false)
        strict = this.BoolCheck(strict, false, false)

        if (!self_call) {
            return_value = this.NumCheck(return_value, true, 0, true)
        } else {
            return_value = 0
        }
        input_value = this.NullCheck(input_value, false, return_value)

        if (typeof (input_value == 'number')) { return input_value }
        else if (!strict && typeof (input_value) == 'string' && !self_call) {
            return this.NumCheck(parseFloat(input_value), true, return_value, true)
        }
        else { return return_value }
    },

    /**
    * @param {*} input_value
    * @param {integer} return_value
    * @returns {integer}
    */
    IntCheck: function (input_value, return_value) {
        return_value = this.NumCheck(return_value, false, 0)
        return parseInt(this.NumCheck(input_value, false, return_value))
    },

    /**
    * @param {*} input_value
    * @param {string} return_value
    * @returns {string}
    */
    StrCheck: function (input_value, return_value) {
        return_value = this.NullCheck(return_value, false, "")
        input_value = this.NullCheck(input_value, false, return_value.toString())
        if (typeof (input_value == 'string')) { return input_value }
        else { return input_value.toString() }
    },

    /**
    * @param {*} input_value
    * @param {array} return_value
    * @returns {array}
    */
    ArrCheck: function (input_value, return_value) {
        return_value = this.NullCheck(return_value, false, [])
        if (Array.isArray(this.NullCheck(input_value, false, return_value))) { return input_value } else { return return_value }
    },

    /**
    * @param {*} input_value
    * @param {number} min_value
    * @param {number} max_value
    * @returns {number}
    */
    Clamp: function (input_value, min_value, max_value) {
        min_value = this.NumCheck(min_value, false, 0)
        max_value = this.NumCheck(max_value, false, 1)
        input_value = this.NumCheck(input_value, true, max_value)
        return Math.max(Math.min(input_value, max_value), min_value)
    },

    /**
     * @param {*} input_value
     * @returns {boolean}
     */
    HasValue: function (input_value) {
        if (this.NullCheck(input_value, false, false)) { return true } else { return false }
    },

    /**
     * @param {*} input_value 
     * @param {string} desired_type 
     * @returns {boolean}
     */
    TypeCheck: function(input_value,desired_type) {
        if(this.HasValue(desired_type)){
            if(desired_type == 'array'){
                return Array.isArray(this.NullCheck(input_value))
            }
            else{
                return typeof(this.NullCheck(input_value) == desired_type)
            }
        }else{
            return false
        }
    },

    resource_table: {
        "catnip": 0,
        "wood": 1,
        "minerals": 2,
        "coal": 3,
        "iron": 4,
        "titanium": 5,
        "gold": 6,
        "oil": 7,
        "uranium": 8,
        "unobtainium": 9,
        "antimatter": 10,
        "manpower": 11,
        "science": 12,
        "culture": 13,
        "faith": 14,
        "kittens": 15,
        "zebras": 16,
        "starchart": 17,
        "temporalFlux": 18,
        "gflops": 19,
        "hashrates": 20,
        "furs": 21,
        "ivory": 22,
        "spice": 23,
        "unicorns": 24,
        "alicorn": 25,
        "necrocorn": 26,
        "tears": 27,
        "karma": 28,
        "paragon": 29,
        "burnedParagon": 30,
        "timeCrystal": 31,
        "sorrow": 32,
        "relic": 33,
        "void": 34,
        "elderBox": 35,
        "wrappingPaper": 36,
        "blackcoin": 37,
        "bloodstone": 38,
        "tMythril": 39,
        "beam": 40,
        "slab": 41,
        "plate": 42,
        "steel": 43,
        "concrate": 44,
        "gear": 45,
        "alloy": 46,
        "eludium": 47,
        "scaffold": 48,
        "ship": 49,
        "tanker": 50,
        "kerosene": 51,
        "parchment": 52,
        "manuscript": 53,
        "compedium": 54,
        "blueprint": 55,
        "thorium": 56,
        "megalith": 57,
    },

    /**
    *  @return {void}
    */
    resource_init: function () {
        for (var index = 0; index < game.resPool.resources.length; index++) {
            try {
                this.resource_table[game.resPool.resources[index].name] = game.resPool.resources[index]
            }
            catch {
                this.messages.error(`Utils.resource_inint`, `${game.resPool.resources[index].name} doesn't exist in resource table.`)
            }
        }
        return true
    },

    messages: {
        /**
        * @param {string} message
        * @param {string} sender
        */
        wrapper: function (message, sender) {
            sender = DBTools.Utils.StrCheck(sender, "DBTools")
            game.msg(`${message}`, null, null, true)
            game.msg(`${DBTools.Utils.TimeStamp()} ${sender}`, null, null, null)
        },

        /**
        * @param {string} what_value
        * @param {*} from_value
        * @param {*} to_value
        */
        toggled: function (what_value, from_value, to_value) {
            this.wrapper(`Toggled ${what_value} from ${from_value} to ${to_value}.`)
        },

        /**
        * @param {string} what_value
        * @param {any} to_value
        */
        set_value: function (what_value, to_value) {
            this.wrapper(`Set ${what_value} to ${to_value}.`)
        },

        /**
        * @param {string} what_value
        * @param {*} from_value
        * @param {*} to_value
        */
        changed_value: function (what_value, from_value, to_value) {
            this.wrapper(`Changed ${what_value} from ${from_value} to ${to_value}.`)
        },

        /**
         * @param {string} sender String describing where error was sent from
         * @param {string[]} error_message Array of strings describing errors
         * @param {string} error_message Single string describing error
         */
        errormsg: function (sender, error_message) {
            if(DBTools.Utils.TypeCheck(error_message)){
                for(var index = 0; index < error_message.length; index++){
                    game.msg(`${error_message[index]}`,`DBTools.ErrorDesc`, `DBTools.Error`, true)
                }
            }else{
                game.msg(`${error_message}`, `DBTools.ErrorDesc`, `DBTools.Error`, true)
            }
            game.msg(`${DBTools.Utils.TimeStamp()} ${sender} - ERROR`, "DBTools.Error", "DBTools.Error", null)
        },

        /**
        * @param {string} what_value
        * @param {string} info_message
        */
        infomsg: function (what_value, info_message) {
            this.wrapper(info_message, what_value)
        },

        /**
        * @param {string} input_name
        * @param {bool} input_enabled
        * @param {integer} input_multiplier 
        */
        autocrafter_settings: function (input_name, input_enabled, input_multiplier) {
            game.msg(`Multiplier: ${input_multiplier}`, "DBTools.AutoCrafter", "item_settings", true)
            game.msg(`Enabled: ${input_enabled}`, "DBTools.AutoCrafter", "item_settings", true)
            game.msg(`Name: ${input_name}`, "DBTools.AutoCrafter", "item_settings", true)
            game.msg(`${DBTools.Utils.TimeStamp()} AutoCrafter - Settings`, "DBTools.AutoCrafter", "item_settings", null)
        },
    },

    /**
     * @param {integer, string} input_integer 
     * @returns {string}
     */
    AddZero: function (input_integer) {
        input_integer = this.NumCheck(input_integer, false, -1)
        if (input_integer == -1) {
            return null
        } else {
            if (parseInt(input_integer) < 10) { return `0${input_integer.toString()}` }
            else { return input_integer };
        }
    },

    /**
     * @param {integer} method 
     * @returns {string}
     */
    TimeStamp: function (method) {
        method = this.IntCheck(method, 0)
        var ct = new Date;
        var fts_date = `${ct.getFullYear().toString()} - ${this.AddZero(ct.getMonth() + 1).toString()} - ${this.AddZero(ct.getDate()).toString()}`
        var fts_time = `${this.AddZero(ct.getHours()).toString()}:${this.AddZero(ct.getMinutes()).toString()}:${this.AddZero(ct.getSeconds()).toString()}`;
        switch (method) {
            case (1):
                return `[${fts_date}]`;
                break;
            case (2):
                return `[${fts_time}]`;
                break;
            default:
                return `[${fts_date} ${fts_time}]`;
                break;
        }
    },

    tab_table: {
        bonfire: {},
        village: {},
        science: {},
        workshop: {},
        trade: {},
        religion: {},
        space: {},
        time: {},
        challenges: {},
        achievements: {},
        stats: {},
    },

    /**
    *  @return {void}
    */
    tab_init: function () {
        for (var index = 0; index < game.tabs.length; index++) {
            this.tab_table[`${game.tabs[index].tabId.toLowerCase()}`] = game.tabs[index]
            if (game.tabs[index].visible) { game.tabs[index].domNode.click() }
        }
        game.tabs[0].domNode.click()
    },


    load_save: {

        /**
         * @param {string} save_id
         * @returns {void}
        */
        save_settings: function (save_id) {
            save_id = DBTools.Utisls.StrCheck(save_id, `kittensgame_dbtools_saved_settings`)
            var savedata = {
                global_data: {
                    GlobalTimer: DBTools.GlobalTimer,
                    Precision: DBTools.Precision,
                    Halt: DBTools.Halt,
                    Debug: DBTools.Debug,
                },
                autocrafter_data: {
                    enabled: DBTools.AutoCrafter.enabled,
                    scale: DBTools.AutoCrafter.generic_max_value_scale,
                    settings: DBTools.AutoCrafter.settings,
                    prereqs: DBTools.AutoCrafter.prereqs,
                },
                autoreligion: {
                    enabled: DBTools.AutoReligion.enabled,
                    percent: DBTools.AutoReligion.percent,
                },
                autounicorn: {
                    enabled: DBTools.AutoUnicorn.enabled,
                    min_val: DBTools.AutoUnicorn.min_val,
                    multiplier: DBTools.AutoUnicorn.multiplier,
                    base_cost: DBTools.AutoUnicorn.base_cost,
                },
                autoscience: {
                    enabled: DBTools.AutoScience.enabled
                },
                autohunt: {
                    enabled: DBTools.AutoHunt.enabled,
                    cost: DBTools.AutoHunt.cost,
                    multiplier: DBTools.AutoHunt.multiplier,
                },
            }
            var encoded_data = btoa(JSON.stringify(savedata));

            if (this.check_for_saved_settings(save_id)) {
                console.log(`Warning: ${save_id} already exists, overwriting.`)
            }

            localStorage.setItem(save_id, encoded_data)
            return
        },

        /**
         * @param {string} save_id
         * @returns {boolean}
         */
        check_for_saved_settings: function (save_id) {
            save_id = DBTools.Utisls.StrCheck(save_id, `kittensgame_dbtools_saved_settings`)
            if (DBTools.Utils.HasValue(localStorage.getItem(save_id))) {
                return true
            } else {
                return false
            }
        },

        /**
         * @param {string} save_id
         * @returns {void}
         */
        load_saved_settings: function (save_id) {
            save_id = DBTools.Utisls.StrCheck(save_id, `kittensgame_dbtools_saved_settings`)
            var encoded_data;
            var savedata;
            if(this.check_for_saved_settings(save_id)){
                console.log(`Loading DBTools data from ${save_id}`)
                encoded_data = localStorage.getItem(save_id)
                savedata = JSON.parse(atob(encoded_data))
                // AutoCrafter
                DBTools.AutoCrafter.enabled = savedata.autocrafter.enabled
                
            }
        },

        /**
         * @param {string} save_id
         * @returns {void}
         */
        delete_saved_settings: function (save_id) {
            save_id = DBTools.Utisls.StrCheck(save_id, `kittensgame_dbtools_saved_settings`)
        },
    }
}

DBTools.Classes = {
    crafting_prereq: class {
        ingredients = []
        requires_positive = false

        constructor(input_array, input_bool) {
            input_array = DBTools.ArrCheck(input_array)
            input_bool = DBTools.BoolCheck(input_bool, false, false)
            this.ingredients = input_array
            this.requires_positive = input_bool
        }
    },
    ingredient: class {
        name = ""
        cost = 1
        min_val = -1

        constructor(input_string, input_cost, input_minimum) {
            input_string = DBTools.StrCheck(input_string, "")
            input_cost = DBTools.Clamp(DBTools.IntCheck(input_cost, 1), 1, Number.MAX_SAFE_INTEGER)
            input_minimum = DBTools.Clamp(DBTools.IntCheck(input_minimum, -1), -1, Number.MAX_SAFE_INTEGER)

            this.name = input_string
            this.cost = input_cost
            this.min_val = input_minimum
        }
    }
}

/**
 * @param {boolean} forced_state
 * @returns {boolean} 
 */
DBTools.Toggle = function (forced_state) {
    if (this.Utils.BoolCheck(forced_state, true, false)) { forced_state = !this.Halt }
    this.Utils.messages.toggled("Halt", this.Halt, forced_state)
    this.Halt = forced_state
    if (!this.Halt) { DBTools.CoreLoop(this.GlobalTimer, this.Halt) }
    return this.Halt
}

/**
 * @param {integer} number
 * @returns {integer} 
 */
DBTools.Rate = function (number) {
    var new_value = DBTools.Utils.Clamp(DBTools.IntCheck(number, DBTools.GlobalTimer), 200, 86400)
    this.Utils.messages.changed_value("GlobalTimer", this.GlobalTimer, new_value)
    this.GlobalTimer = new_value
    return this.GlobalTimer
}

/**
 * @param {integer} timeout 
 * @param {boolean} cancel 
 * @returns {void}
 */
DBTools.CoreLoop = function (timeout, cancel) {
    timeout = DBTools.Utils.Clamp(DBTools.Utils.IntCheck(timeout, DBTools.GlobalTimer), 200, 86400)
    cancel = DBTools.Utils.BoolCheck(cancel, false, DBTools.Halt)
    if (!DBTools.Initiated) { DBTools.Init() }

    /* Runners */
    DBTools.AutoCrafter.run()
    DBTools.AutoReligion.run()
    DBTools.AutoUnicorn.run()
    DBTools.AutoScience.run()
    DBTools.AutoHunt.run()

    /* Self-Call */
    if (!cancel) {
        setTimeout(function () { DBTools.CoreLoop(timeout, DBTools.Halt) }, timeout)
    } else {
        DBTools.Utils.messages.wrapper(`CoreLoop instructed to cancel.`)
    }
}

/**
 * @returns {void}
 */
DBTools.Run = function () { this.Toggle(false) }

/**
 * @returns {void}
 */
DBTools.Stop = function () { this.Utils.messages.set_value("Halt", true); this.Halt = true }

/**
 * @returns {void}
 */
DBTools.ToggleAll = function () {
    this.AutoCrafter.toggle()
    this.AutoReligion.toggle()
    this.AutoHunt.toggle()
    this.AutoUnicorn.toggle()
}

DBTools.AutoCrafter = {
    /**
     * @type {boolean}
     */
    enabled: false,
    handled_craftables: [
        "wood",
        "beam",
        "scaffold",
        "ship",
        "slab",
        "plate",
        "steel",
        "gear",
        "alloy",
        "megalith",
        "parchment",
        "manuscript",
        "compendium",
        "blueprint"
    ],

    /**
     * @returns {void}
     */
    toggle: function () {
        DBTools.Utils.messages.toggled("AutoCrafter", this.enabled, !this.enabled)
        this.enabled = !this.enabled
    },

    settings: {
        wood: { enabled: true, multiplier: 100 },
        beam: { enabled: true, multiplier: 10 },
        scaffold: { enabled: false, multiplier: 1 },
        ship: { enabled: false, multiplier: 1 },
        slab: { enabled: true, multiplier: 10 },
        plate: { enabled: false, multiplier: 1 },
        steel: { enabled: true, multiplier: 10 },
        gear: { enabled: true, multiplier: 5 },
        alloy: { enabled: true, multiplier: 1 },
        megalith: { enabled: false, multiplier: 1 },
        parchment: { enabled: true, multiplier: 50 },
        manuscript: { enabled: false, multiplier: 1 },
        compendium: { enabled: true, multiplier: 1 },
        blueprint: { enabled: true, multiplier: 1 },
    },

    /**
     * @type {integer}
     */
    generic_max_value_scale: 100,

    /**
     * @type {DBTools.Classes.crafting_prereq[]}
     */
    prereqs: {
        //wood : new DBTools.Classes.prereqs([new DBTools.Classes.ingredient("catnip",50,-1)],true)
        wood: {
            ingredients: [{ name: "catnip", cost: 50, min_val: -1 }],
            requires_positive: true
        },
        beam: {
            ingredients: [{ name: "wood", cost: 175, min_val: -1 }],
            requires_positive: false
        },
        scaffold: {
            ingredients: [{ name: "beam", cost: 50, min_val: 1e4 }],
            requires_positive: false
        },
        ship: {
            ingredients: [
                { name: "starchart", cost: 25, min_val: 1e3 },
                { name: "plate", cost: 150, min_val: 5e3 },
                { name: "scaffold", cost: 100, min_val: 5e3 }
            ],
            requires_positive: false
        },
        slab: {
            ingredients: [{ name: "minerals", cost: 250, min_val: -1 }],
            requires_positive: false
        },
        plate: {
            ingredients: [{ name: "iron", cost: 125, min_val: -1 }],
            requires_positive: false
        },
        steel: {
            ingredients: [
                { name: "iron", cost: 100, min_val: -1 },
                { name: "coal", cost: 100, min_val: -1 }
            ],
            requires_positive: false
        },
        gear: {
            ingredients: [{ name: "steel", cost: 15, min_val: 1e4 }],
            requires_positive: false
        },
        alloy: {
            ingredients: [
                { name: "steel", cost: 75, min_val: 7.5e3 },
                { name: "titanium", cost: 10, min_val: -1 },
            ],
            requires_positive: false
        },
        megalith: {
            ingredients: [
                { name: "beam", cost: 25, min_val: 7.5e3 },
                { name: "slab", cost: 50, min_val: 5e3 },
                { name: "plate", cost: 5, min_val: 5e3 },
            ],
            requires_positive: false
        },
        parchment: {
            ingredients: [{ name: "furs", cost: 175, min_val: 1e6 }],
            requires_positive: true
        },
        manuscript: {
            ingredients: [
                { name: "parchment", cost: 20, min_val: 1e4 },
                { name: "culture", cost: 300, min_val: -1 }
            ],
            requires_positive: false
        },
        compendium: {
            ingredients: [
                { name: "science", cost: 1e4, min_val: -1 },
                { name: "manuscript", cost: 50, min_val: 5e3 }
            ],
            requires_positive: true
        },
        blueprint: {
            ingredients: [
                { name: "science", cost: 2.5e4, min_val: -1 },
                { name: "compendium", cost: 25, min_val: 5e3 }
            ],
            requires_positive: false
        },
    },


    /**
     * @param {string} resource 
     * @param {integer} cost_multiplier 
     * @returns {boolean}
     */
    craft: function (resource, cost_multiplier) {
        var can_craft = true

        for (var index = 0; index < this.prereqs[resource].ingredients.length; index++) {
            var current_resource = Object.assign({}, DBTools.Utils.resource_table[this.prereqs[resource].ingredients[index].name])
            current_resource.calculated_maxValue = current_resource.maxValue
            current_resource.base_cost = this.prereqs[resource].ingredients[index].cost
            current_resource.min_val = DBTools.Utils.IntCheck(this.prereqs[resource].ingredients[index].min_val, -1)
            current_resource.calculated_cost = current_resource.base_cost * cost_multiplier

            if (current_resource.maxValue <= 0) {
                current_resource.calculated_maxValue = current_resource.calculated_cost * this.generic_max_value_scale
            }

            var at_cap = (current_resource.value > (current_resource.calculated_maxValue - current_resource.base_cost))
            if (current_resource.min_val >= 1) { at_cap = (current_resource.value > current_resource.min_val) }
            var can_afford = (current_resource.value > current_resource.calculated_cost)
            var is_gaining = (current_resource.perTickCached > 0)
            var is_safe = !this.prereqs[resource].requires_positive

            if (this.prereqs[resource].requires_positive) {
                if (is_gaining) { is_safe = true } else { is_safe = false }
            }

            if (DBTools.Debug) {
                console.log(`${resource}: at_cap(${at_cap}) && can_afford(${can_afford})`)
                console.log(`${resource}_mv[${current_resource.maxValue}]: ${current_resource.calculated_maxValue} = ${current_resource.calculated_cost} * ${this.generic_max_value_scale}`)
                console.log(`Current Ingredient: ${current_resource.name}\n> Current Cost: ${current_resource.base_cost}\n> Craft Barrier: ${current_resource.calculated_maxValue}\n> Current Amount: ${current_resource.value}\n> Possible: ${can_afford}`)
            }


            if (at_cap && can_afford) {
                can_craft = (can_craft && true);
            } else {
                can_craft = false
            }
        }
        //console.log(`Able to craft ${resource}: ${can_craft}`)
        if (can_craft) {
            game.craft(resource, cost_multiplier)
            game.msg(`+${(cost_multiplier * (1 + game.getResCraftRatio(resource))).toFixed(DBTools.Precision)} ${resource}`, "workshopautomation", null, "craft")
            return true
            //game.msg($I("workshop.crafted.msg", [game.getDisplayValueExt(cost_multiplier * (1 + game.getResCraftRatio(resource))), resource]), null, "craft");
        } else {
            return false
        }
    },

    /**
     * @param {boolean} forced
     * @returns {void}
     */
    run: function (forced) {
        if (this.enabled || DBTools.Utils.BoolCheck(forced, false, false)) {
            var timestamp = DBTools.Utils.TimeStamp(2)
            var has_crafted = false
            if (this.settings.wood.enabled) { has_crafted = has_crafted || this.craft("wood", this.settings.wood.multiplier) }
            if (this.settings.beam.enabled) { has_crafted = has_crafted || this.craft("beam", this.settings.beam.multiplier) }
            if (this.settings.scaffold.enabled) { has_crafted = has_crafted || this.craft("scaffold", this.settings.scaffold.multiplier) }
            if (this.settings.ship.enabled) { has_crafted = has_crafted || this.craft("ship", this.settings.ship.multiplier) }
            if (this.settings.slab.enabled) { has_crafted = has_crafted || this.craft("slab", this.settings.slab.multiplier) }
            if (this.settings.plate.enabled) { has_crafted = has_crafted || this.craft("plate", this.settings.plate.multiplier) }
            if (this.settings.steel.enabled) { has_crafted = has_crafted || this.craft("steel", this.settings.steel.multiplier) }
            if (this.settings.gear.enabled) { has_crafted = has_crafted || this.craft("gear", this.settings.gear.multiplier) }
            if (this.settings.alloy.enabled) { has_crafted = has_crafted || this.craft("alloy", this.settings.alloy.multiplier) }
            if (this.settings.megalith.enabled) { has_crafted = has_crafted || this.craft("megalith", this.settings.megalith.multiplier) }
            if (this.settings.parchment.enabled) { has_crafted = has_crafted || this.craft("parchment", this.settings.parchment.multiplier) }
            if (this.settings.manuscript.enabled) { has_crafted = has_crafted || this.craft("manuscript", this.settings.manuscript.multiplier) }
            if (this.settings.compendium.enabled) { has_crafted = has_crafted || this.craft("compendium", this.settings.compendium.multiplier) }
            if (this.settings.blueprint.enabled) { has_crafted = has_crafted || this.craft("blueprint", this.settings.blueprint.multiplier) }
            if (has_crafted) { game.msg(`DBAutoCraft ${timestamp}`, "workshopautomation", null, null) }
        }
    },

    /**
     * @param {string} resource
     * @param {boolean} forced_state
     * @returns {boolean}
     */
    toggle_resource: function (resource, forced_state) {
        if (DBTools.Utils.NullCheck(resource, true) || DBTools.Utils.NullCheck(this.settings[resource], true)) { return false }
        forced_state = DBTools.Utils.BoolCheck(forced_state, false, !this.settings[resource].enabled)
        DBTools.Utils.messages.changed_value(`AutoCrafter.settings.${resource}`, this.setting[resource].enabled, forced_state)
        this.settings[resource].enabled = forced_state
        return this.settings[resource].enabled
    },

    /**
     * @param {string} name
     * @returns {string}
     */
    GetSettings: function (name) {
        var tmp, msg;
        name = DBTools.Utils.StrCheck(name, false)
        if (DBTools.Utils.HasValue(this.settings[name])) {
            tmp = this.settings[name];
            msg = (`Name: ${name}\nEnabled: ${tmp.enabled}\nMultiplier: ${tmp.multiplier}`)
            DBTools.Utils.messages.autocrafter_settings(name, tmp.enabled, tmp.multiplier)
            return (msg)
        } else {
            msg = (`${name} does not exist in settings.`)
            DBTools.Utils.messages.errormsg(`AutoCrafter.GetSettings`, msg)
            return `Error: ${msg}`
        }
    },

    /**
     * @param {string} resource
     * @param {integer} new_multiplier
     * @returns {integer}
     */
    set_mult: function (resource, new_multiplier) {
        if (DBTools.Utils.NullCheck(resource, true) || DBTools.Utils.NullCheck(this.settings[resource], true)) {
            var msg = `${resource} is null or doesn't exist in settings.`
            DBTools.Utils.messages.errormsg(`AutoCrafter.set_muklt`, msg)
            console.log(msg)
            return 0
        }
        new_multiplier = Math.max(DBTools.Utils.IntCheck(new_multiplier), 1)
        DBTools.Utils.messages.changed_value(`AutoCrafter.settings.${resource}`, this.settings[resource].multiplier, new_multiplier)
        this.settings[resource].multiplier = new_multiplier
        return this.settings[resource].multiplier
    },

    /**
     * @param {integer} number
     * @returns {integer}
     */
    set_scale: function (number) {
        number = Math.max(DBTools.Utils.NumCheck(number), 1)
        this.generic_max_value_scale = number
        console.log(`[DBTools - Info]: generic_max_value_scale: ${this.generic_max_value_scale}`)
        return this.generic_max_value_scale
    },

    /**
     * @param {boolean} enabled
     * @param {object} settings
     * @param {object} prereqs
     * @param {integer} generic_max_value_scale
     * @returns {boolean}
     */
    load_data: function (enabled, settings, prereqs, generic_max_value_scale) {
        var valid_enabled = DBTools.Utils.BoolCheck(enabled, true, false)
        var valid_settings = DBTools.Utils.TypeCheck(settings, 'object')
        var valid_prereqs = DBTools.Utils.TypeCheck(prereqs, 'object')
        var valid_generic_max_value_scale = DBTools.Utils.TypeCheck(generic_max_value_scale, 'number')
        var valid_inputs = (valid_enabled && valid_settings && valid_prereqs && valid_generic_max_value_scale)
        //  TODO:
        //  Implement proper settings/prereqs validation 

        if (valid_inputs) {
            var clamped_scale = DBTools.Utils.Clamp(generic_max_value_scale, 1, Number.MAX_SAFE_INTEGER)
            this.enabled = enabled
            //this.settings = settings
            for(var index = 0; index < this.handled_craftables; index ++){
                var name = this.handled_craftables[index]
                if (DBTools.Utils.HasValue(settings[name])){
                    var saved = settings[name]
                    var valid_setting = (DBTools.Utils.BoolCheck(saved.enabled, true, false) && (DBTools.Utils.IntCheck(saved.multiplier,1)))
                    if(valid_setting){
                        this.settings[name].enabled = saved.enabled
                        this.settings[name].multiplier = DBTools.Utils.Clamp(saved.multiplier, 1, Number.MAX_SAFE_INTEGER)
                    }else{
                        console.log(`Warning: Saved settings for ${name} are invalid.`)
                    }
                    saved = prereqs[name]
                    var valid_prereq = (DBTools.Utils.TypeCheck(saved.ingredients, 'array'))
                }
            }
            //this.prereqs = prereqs
            this.generic_max_value_scale = clamped_scale
            return true
        } else {
            var err_header = `Error`;
            var composed_msg;
            var err_count = 0;
            var error_array = [];
            var invalid_state = `Invalid enabled state: `
            var invalid_settings = `Invalid settings value: `
            var invalid_prereqs = `Invalid prereqs value: `
            var invalid_generic_max_value_scale = `Invalid generic_max_value_scale value: `
            if (!valid_enabled) {
                err_count += 1
                composed_msg = `${composed_msg}\n${invalid_state}${enabled}`
                error_array.push(`${invalid_state}${enabled}`)
            }
            if (!valid_settings) {
                err_count += 1
                composed_msg = `${composed_msg}\n${invalid_settings}${settings}`
                error_array.push(`${invalid_settings}${settings}`)
            }
            if (!valid_prereqs) {
                err_count += 1
                composed_msg = `${composed_msg}\n${invalid_prereqs}${prereqs}`
                error_array.push(`${invalid_prereqs}${prereqs}`)
            }
            if (!valid_generic_max_value_scale) {
                err_count += 1
                composed_msg = `${composed_msg}\n${invalid_generic_max_value_scale}${generic_max_value_scale}`
                error_array.push(`${invalid_generic_max_value_scale}${generic_max_value_scale}`)
            }
            if (err_count > 1) {
                err_header = `${err_header}s`
            }
            composed_msg = `${err_header}${composed_msg}`
            DBTools.Utils.messages.errormsg(`AutoUnicorn.load_data`, error_array)
            console.log(composed_msg)
            return false
        }
    },
}

DBTools.AutoReligion = {
    /**
     * @type {boolean}
     */
    enabled: false,

    /**
     * @returns {boolean}
     */
    toggle: function () {
        DBTools.Utils.messages.toggled("AutoReligion", this.enabled, !this.enabled)
        this.enabled = !this.enabled
        return this.enabled
    },

    /**
     * @type {number}
     */
    percent: 0.95,

    /**
     * @param {number} number
     * @returns {number}
     */
    set_percent: function (number) {
        var new_value = DBTools.Utils.Clamp(number, 0, 1)
        DBTools.Utils.messages.changed_value("AutoReligion.percent", this.percent, new_value)
        this.percent = new_value;
        return this.percent
    },

    /**
     * @param {boolean} forced
     * @returns {void} 
     */
    run: function (forced) {
        if (this.enabled || DBTools.Utils.BoolCheck(forced, false, false)) {
            if (DBTools.Utils.resource_table["faith"].value >= (DBTools.Utils.resource_table["faith"].maxValue * this.percent)) { game.religion.praise() }
        }
    },

    /**
     * @param {boolean} enabled
     * @param {float} percent
     * @returns {boolean}
     */
    load_data: function (enabled, percent) {
        var valid_enabled = DBTools.Utils.BoolCheck(enabled, true, false)
        var valid_percent = DBTools.Utils.TypeCheck(percent, 'number')
        var valid_inputs = (valid_enabled && valid_percent)
        if (valid_inputs) {
            var clamped_percent = DBTools.Utils.Clamp(percent, 0, 1)
            this.enabled = enabled
            this.percent = clamped_percent
            return true
        } else {
            var err_header = `Error`;
            var composed_msg;
            var err_count = 0;
            var error_array = [];
            var invalid_state = `Invalid enabled state: `
            var invalid_percent = `Invalid percent value: `
            if (!valid_enabled) {
                err_count += 1
                composed_msg = `${composed_msg}\n${invalid_state}${enabled}`
                error_array.push(`${invalid_state}${enabled}`)
            }
            if (!valid_percent) {
                err_count += 1
                composed_msg = `${composed_msg}\n${invalid_percent}${percent}`
                error_array.push(`${invalid_percent}${percent}`)
            }
            if (err_count > 1) {
                err_header = `${err_header}s`
            }
            composed_msg = `${err_header}${composed_msg}`
            DBTools.Utils.messages.errormsg(`AutoReligion.load_data`, error_array)
            console.log(composed_msg)
            return false
        }
    },
}

DBTools.AutoUnicorn = {
    /**
     * @type {boolean}
     */
    enabled: false,

    /**
     * @returns {boolean}
     */
    toggle: function () {
        DBTools.Utils.messages.toggled("AutoUnicorn", this.enabled, !this.enabled)
        this.enabled = !this.enabled
        return this.enabled
    },

    /**
     * @type {integer}
     */
    min_val: 1e4,

    /**
     * @type {integer}
     */
    multiplier: 1,

    /**
     * @type {integer}
     */
    base_cost: 2500,

    /**
     * @param {integer} number 
     * @returns {integer}
     */
    set_min: function (number) {
        var new_value = DBTools.Utils.Clamp(number, 2500, Number.MAX_SAFE_INTEGER)
        DBTools.Utils.messages.changed_value("AutoUnicorn.min_val", this.min_val, new_value)
        this.min_val = new_value;
        return this.min_val
    },

    /**
     * @param {integer} number 
     * @returns {integer}
     */
    set_mult: function (number) {
        var new_mult = Math.max(DBTools.Utils.IntCheck(number, 1), 1)
        DBTools.Utils.messages.changed_value("AutoUnicorn.multiplier", this.multiplier, new_mult)
        this.multiplier = new_mult
        return this.multiplier
    },

    /**
     * @param {boolean} forced
     * @returns {void}
     */
    run: function (forced) {
        if (this.enabled || DBTools.Utils.BoolCheck(forced, false, false)) {
            if (DBTools.Utils.resource_table["unicorns"].value >= (this.min_val + (this.base_cost * this.multiplier))) { this.click_hijack.domNode.click() }
        }
    },

    /**
     * @type {object}
     */
    click_hijack: {
        domNode: { click: function () { DBTools.AutoUnicorn.init() } }
    },

    /**
     * @returns {void}
     */
    init: function () {
        if (DBTools.Utils.NullCheck(game.religionTab.sacrificeBtn)) {
            this.hijacker();
        } else {
            DBTools.Utils.tab_table.religion.domNode.click()
            setTimeout(this.hijacker, 500)
        }
    },

    /**
     * @returns {void}
     */
    hijacker: function () {
        this.click_hijack = Object.assign({}, game.religionTab.sacrificeBtn)
    },

    /**
     * @param {boolean} enabled
     * @param {integer} min_val
     * @param {integer} multiplier
     * @param {integer} base_cost
     * @returns {boolean}
     */
    load_data: function (enabled, min_val, multiplier, base_cost) {
        var valid_enabled = DBTools.Utils.BoolCheck(enabled, true, false)
        var valid_min_val = DBTools.Utils.TypeCheck(min_val, 'number')
        var valid_multiplier = DBTools.Utils.TypeCheck(multiplier, 'number')
        var valid_base_cost = DBTools.Utils.TypeCheck(base_cost, 'number')
        var valid_inputs = (valid_enabled && valid_min_val && valid_multiplier && valid_base_cost)
        if (valid_inputs) {
            var clamped_minval = DBTools.Utils.Clamp(min_val, 1, Number.MAX_SAFE_INTEGER)
            var clamped_mult = DBTools.Utils.Clamp(multiplier, 1, Number.MAX_SAFE_INTEGER)
            var clamped_cost = DBTools.Utils.Clamp(base_cost, 1, Number.MAX_SAFE_INTEGER)
            this.enabled = enabled
            this.min_val = clamped_minval
            this.multiplier = clamped_mult
            this.base_cost = clamped_cost
            return true
        } else {
            var err_header = `Error`;
            var composed_msg;
            var err_count = 0;
            var error_array = [];
            var invalid_state = `Invalid enabled state: `
            var invalid_minval = `Invalid min_val value: `
            var invalid_mult = `Invalid multiplier value: `
            var invalid_cost = `Invalid base_cost value: `
            if (!valid_enabled) {
                err_count += 1
                composed_msg = `${composed_msg}\n${invalid_state}${enabled}`
                error_array.push(`${invalid_state}${enabled}`)
            }
            if(!valid_min_val){
                err_count += 1
                composed_msg = `${composed_msg}\n${invalid_minval}${min_val}`
                error_array.push(`${invalid_minval}${min_val}`)
            }
            if (!valid_multiplier) {
                err_count += 1
                composed_msg = `${composed_msg}\n${invalid_mult}${multiplier}`
                error_array.push(`${invalid_mult}${multiplier}`)
            }
            if (!valid_base_cost) {
                err_count += 1
                composed_msg = `${composed_msg}\n${invalid_cost}${base_cost}`
                error_array.push(`${invalid_cost}${base_cost}`)
            }
            if (err_count > 1) {
                err_header = `${err_header}s`
            }
            composed_msg = `${err_header}${composed_msg}`
            DBTools.Utils.messages.errormsg(`AutoUnicorn.load_data`, error_array)
            console.log(composed_msg)
            return false
        }
    },
}

DBTools.AutoScience = {
    /**
     * @type {boolean}
     */
    enabled: false,

    /**
     * @returns {boolean}
     */
    toggle: function () {
        DBTools.Utils.messages.toggled("AutoScience", this.enabled, !this.enabled)
        this.enabled = !this.enabled
        return this.enabled
    },

    /**
     * @returns {void}
     */
    run: function (forced) {
        if (this.enabled || DBTools.Utils.BoolCheck(forced, false, false)) {
            this.enabled = false
        }
    },

    /**
     * @param {boolean} enabled 
     * @returns {boolean}
     */
    load_data : function(enabled){
        var valid_enabled = DBTools.Utils.BoolCheck(enabled,true,false)
        var valid_inputs = (valid_enabled)
        if(valid_inputs){
            this.enabled = enabled
            return true
        }else{
            var err_header = `Error`;
            var composed_msg;
            var err_count = 0;
            var error_array = [];
            var invalid_state = `Invalid enabled state: `
            if (!valid_enabled) {
                err_count += 1
                composed_msg = `${composed_msg}\n${invalid_state}${enabled}`
                error_array.push(`${invalid_state}${enabled}`)
            }
            if (err_count > 1) {
                err_header = `${err_header}s`
            }
            composed_msg = `${err_header}${composed_msg}`
            DBTools.Utils.messages.errormsg(`AutoScience.load_data`, error_array)
            console.log(composed_msg)
            return false
        }
    },
}

DBTools.AutoHunt = {
    /**
     * @type {boolean}
     */
    enabled: false,

    /**
     * @returns {boolean}
     */
    toggle: function () {
        DBTools.Utils.messages.toggled("AutoHunt", this.enabled, !this.enabled)
        this.enabled = !this.enabled
        return this.enabled
    },

    /**
     * @type {integer}
     */
    cost: (100 - game.getEffect("huntCatpowerDiscount")),

    /**
     * @type {integer}
     */
    multiplier: 5,

    /**
     * @param {integer} number
     * @returns {integer}
     */
    set_mult: function (number) {
        var new_mult = Math.max(DBTools.Utils.IntCheck(number, 1), 1)
        DBTools.Utils.messages.changed_value("AutoHunt.multiplier", this.multiplier, new_mult)
        this.multiplier = new_mult
        return this.multiplier
    },


    // Had to manually remove resources because for some reason the game doesn't in the function??
    /**
     * @param {boolean} forced
     * @returns {void}
     */
    run: function (forced) {
        if (this.enabled || DBTools.Utils.BoolCheck(forced, false, false)) {
            var atLimit = (DBTools.Utils.resource_table["manpower"].value > (DBTools.Utils.resource_table["manpower"].maxValue - this.cost))
            var canAfford = (DBTools.Utils.resource_table["manpower"].value > (this.cost * this.multiplier))
            if (atLimit && canAfford) { game.resPool.addResEvent("manpower", (-this.cost * this.multiplier)); game.village.gainHuntRes(this.multiplier) }
        }
    },

    /**
     * @param {boolean} enabled 
     * @param {integer} cost 
     * @param {integer} multiplier
     * @returns {boolean}
     */
    load_data: function(enabled,cost,multiplier){
        var valid_enabled = DBTools.Utils.BoolCheck(enabled,true,false)
        var valid_cost = DBTools.Utils.TypeCheck(cost, 'number')
        var valid_multiplier = DBTools.Utils.TypeCheck(multiplier, 'number')
        var valid_inputs = (valid_enabled && valid_cost && valid_multiplier)

        if(valid_inputs){
            var clamped_cost = DBTools.Utils.Clamp(cost, 1, Number.MAX_SAFE_INTEGER)
            var clamped_multiplier = DBTools.Utils.Clamp(multiplier, 1, Number.MAX_SAFE_INTEGER)
            this.enabled = enabled
            this.cost = clamped_cost
            this.multiplier = clamped_multiplier
            return true
        }else{
            var err_header = `Error`;
            var composed_msg;
            var err_count = 0;
            var error_array = [];
            var invalid_state = `Invalid enabled state: `
            var invalid_cost = `Invalid cost value: `
            var invalid_mult = `Invalid multiplier value: `
            if(!valid_enabled){
                err_count += 1
                composed_msg = `${composed_msg}\n${invalid_state}${enabled}`
                error_array.push(`${invalid_state}${enabled}`)
            }
            if(!valid_cost){
                err_count += 1
                composed_msg = `${composed_msg}\n${invalid_cost}${cost}`
                error_array.push(`${invalid_cost}${cost}`)
            }
            if(!valid_multiplier){
                err_count += 1
                composed_msg = `${composed_msg}\n${invalid_mult}${multiplier}`
                error_array.push(`${invalid_mult}${multiplier}`)
            }
            if(err_count > 1){
                err_header = `${err_header}s`
            }
            composed_msg = `${err_header}${composed_msg}`
            DBTools.Utils.messages.errormsg(`AutoCrafter.load_data`,error_array)
            console.log(composed_msg)
            return false
        }
    },
}

DBTools.ToggleAll()
DBTools.Run()