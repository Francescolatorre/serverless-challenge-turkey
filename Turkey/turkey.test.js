const httpFunction = require('./index');
const context = require('../testing/defaultContext')

beforeEach(() =>{
    context.log("before each");
    jest.restoreAllMocks();

});

afterEach(() => {
    context.log("after each")
    jest.restoreAllMocks();
});



describe('bei fehlendem Query Parameter', () => {

    const request = {
    };


    test('wird http 400 Bad Request geliefert', async () => {
        await httpFunction(context, request);

        //expect(context.log).toBeCalledTimes(1);
        expect(context.res.status).toEqual(400);
        expect(context.res.body).toEqual("Please provide the turkey weight, numeric in lbs - at least 1 lbs");
    });
});

describe('Nicht-numerischer Wert im Gewicht', () => {

    test('bei Text - wird http 400 Bad Request geliefert', async () => {

        const request = {
            query :{
                weight: "asdf"
            }
        };
        await httpFunction(context, request);
        expect(context.res.status).toEqual(400);
        expect(context.res.body).toEqual("Please provide the turkey weight, numeric in lbs - at least 1 lbs");
    });
    
    test('bei leerem Feld - http 400 Bad Request geliefert', async () => {

        const request = {
            query :{
                weight: ""
            }
        };
        await httpFunction(context, request);
        expect(context.res.status).toEqual(400);
        expect(context.res.body).toEqual("Please provide the turkey weight, numeric in lbs - at least 1 lbs");
    });

    test('bei nur Sonderzeichen - http 400 Bad Request geliefert', async () => {

        const request = {
            query :{
                weight: "§$$§%$§&"
            }
        };
        await httpFunction(context, request);
        expect(context.res.status).toEqual(400);
        expect(context.res.body).toEqual("Please provide the turkey weight, numeric in lbs - at least 1 lbs");
    });

    test('bei Sonderzeichen nur vorne - http 400 Bad Request geliefert', async () => {

        const request = {
            query :{
                weight: "§123"
            }
        };
        await httpFunction(context, request);
        expect(context.res.status).toEqual(400);
        expect(context.res.body).toEqual("Please provide the turkey weight, numeric in lbs - at least 1 lbs");
    });

    test('bei Text  nur hinten - http 400 Bad Request geliefert', async () => {

        const request = {
            query :{
                weight: "123lbs"
            }
        };
        await httpFunction(context, request);
        expect(context.res.status).toEqual(400);
        expect(context.res.body).toEqual("Please provide the turkey weight, numeric in lbs - at least 1 lbs");
    });

    test('bei Text  nur hinten - http 400 Bad Request geliefert', async () => {

        const request = {
            query :{
                weight: "123 lbs"
            }
        };
        await httpFunction(context, request);
        expect(context.res.status).toEqual(400);
        expect(context.res.body).toEqual("Please provide the turkey weight, numeric in lbs - at least 1 lbs");
    });
});

describe('bei Gewicht < 1 lbs', () => {
    const request = {
        query :{
            weight: 0.1
        }
    };
    
    test('wird http 400 Bad Request geliefert', async () => {
        await httpFunction(context, request);
        expect(context.res.status).toEqual(400);
        expect(context.res.body).toEqual("Please provide the turkey weight, numeric in lbs - at least 1 lbs");
    });
});


describe('bei Gewicht > 1000 lbs', () => {
    const request = {
        query :{
            weight: 1001
        }
    };
    
    test('wird http 400 Bad Request geliefert', async () => {
        await httpFunction(context, request);
        expect(context.res.status).toEqual(400);
        expect(context.res.body).toEqual("Please provide the turkey weight, numeric in lbs - at max 1,000 lbs");
    });
});
