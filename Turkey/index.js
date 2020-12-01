module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let responseMessage = "";
    const weight = (req.query && req.query.weight);

    /*
    Salt (in cups) = 0.05 * lbs of turkey
    Water (gallons) = 0.66 * lbs of turkey
    Brown sugar (cups) = 0.13 * lbs of turkey
    Shallots = 0.2 * lbs of turkey
    Cloves of garlic = 0.4 * lbs of turkey
    Whole peppercorns (tablespoons) = 0.13 * lbs of turkey
    Dried juniper berries (tablespoons) = 0.13 * lbs of turkey
    Fresh rosemary (tablespoons) = 0.13 * lbs of turkey
    Thyme (tablespoons) = 0.06 * lbs of turkey
    Brine time (in hours) = 2.4 * lbs of turkey
    Roast time (in minutes) = 15 * lbs of turkey
    */

    if (weight && !(isNaN(weight)) ){
        var weightNum = weight.valueOf ()
        if ( weightNum >= 1 && weightNum < 1001)
        {
            /* in here we need the recipe*/
            let recipe = {
                salt_cups: 0.05 * weightNum,
                water_gallons: 0.55 * weightNum,
                brown_sugar_sups: 0.13 * weightNum,
                shallots_lbs: 0.2 * weightNum,
                garlic_cloves: 0.4 * weightNum,                
                whole_peppercorns_tblsp: 0.13 * weightNum,
                dried_juniper_berries_tblsp: 0.13 * weightNum,
                fresh_rosemary_tblsp: 0.13 * weightNum,
                thyme_tblsp: 0.06 * weightNum,
                brine_time_hours: 2.4 * weightNum,
                roast_time_minutes: 15 * weightNum
            }
            

            context.res = { status: 200, /* Defaults to 200 */
                            body: JSON.stringify(recipe) };
        }
        else if (weightNum > 1000){
            context.res = { status: 400, 
                body: "Please provide the turkey weight, numeric in lbs - at max 1,000 lbs" };
        }
    }
    else    {
        context.res = {
            status: 400, /* Defaults to 400 */
            body: "Please provide the turkey weight, numeric in lbs - at least 1 lbs"
        };
    }
    

    
}