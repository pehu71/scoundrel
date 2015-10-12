exports.getConfig = function () {
    return {
        port: 4343,
        routes: [
            {
                pathPattern: "/cars/list",
                method: "GET",
                requiredStatus: 200,
                responseData: {
                    entityCount: 50,
                    modifyRandomly: false,
                    alwaysReturnArray: true,
                    dataModel: {
                        Id: 52369,
                        Color: 'blue',
                        Brand: "Ford",
                        Type: "Fiesta",
                        YearOfProd: 2004
                    }
                }
            },
            {
                pathPattern: "/car/detail",
                method: "GET",
                requiredStatus: 200,
                responseData: {
                    entityCount: 1,
                    modifyRandomly: false,
                    alwaysReturnArray: false,
                    dataModel: {
                        Id: 52369,
                        Color: 'blue',
                        Brand: "Ford",
                        Type: "Fiesta",
                        YearOfProd: 2004,
                        Specs: {
                            Seats: 5,
                            Fuel: "gasoline",
                            Power: "71 HP",
                            MaxSpeed: 157,
                            Price: 36000
                        },
                        PrevOwner: {
                            email: 'mahu@pehu.info',
                            tel: '+420723148510'
                        },
                        Notes: ['255 000 km', 'Service book', 'Perfect state']
                    }
                }
            }
        ]
    }
};
