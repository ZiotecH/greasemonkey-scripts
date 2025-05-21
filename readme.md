# DBTools
A simple set of tools that automate some of the things in [kittensgame](https://kittensgame.com/web/).

### It currently consists of;
* AutoCrafter
* AutoReligion
* AutoUnicorn
* AutoScience
* AutoHunt

### Usage
I haven't added a GUI to the 'addon' yet, so currently you'll have to paste the entirety of [DBKittensTool.js](DBKittensTool.js) into the dev console to use it.

Some important commands are;
* DBTools.Stop()
    * As the name implies, it halts the `CoreLoop` function on the next call.
* DBTools.Run()
    * Starts the `CoreLoop`
* DBTools.Rate(integer)
    * Sets the time between `CoreLoop` calls on the next call.

As for changing settings for the different sub-components, as of now you'll have to do it using their different helper functions;
### DBTools.AutoCrafter
* DBTools.AutoCrafter.toggle()
    * Toggles AutoCrafter on/off
* DBTools.AutoCrafter.toggle_resource(string, boolean)
    * Toggles auto-crafting of the resource `string` on/off.
    * Optional boolean for a forced state.
* DBTools.AutoCrafter.update_multiplier(string, integer)
    * Sets the craft-multiplier for the resource `string` to `integer`
* DBTools.AutoCrafter.set_scale(integer)
    * Sets the `generic_max_value_scale` to `integer`
### DBTools.AutoReligion
* DBTools.AutoReligion.toggle()
    * Toggles AutoReligion on/off
* DBTools.AutoReligion.set_percent(float)
    * Sets the percent of max `faith` to `float` for which to use `praise`
### DBTools.AutoUnicorn
* DBTools.AutoUnicorn.toggle()
    * Toggles AutoUnicorn on/off
* DBTools.AutoUnicorn.set_min(integer)
    * Sets the minimum value of unicorns to maintain to `integer`
* DBTools.AutoUnicorn.set_mult(integer)
    * Sets the multiplier on how many sacrifices to do to `integer`
### DBTools.AutoHunt
* DBTools.AutoHunt.toggle()
    * Toggles AutoHunt on/off
* DBTools.AutoHunt.set_mult(integer)
    * Sets the amount of hunts per auto-hunt to `integer`
### DBTools.AutoScience
* Does nothing for now