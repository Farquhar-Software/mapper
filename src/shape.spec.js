import { shape, test } from "./shape"


describe("test", () => {
    it("shape.js", () => {
        const result = shape({
            lat: 32.71180328837194,
            long: -94.121577724154,
            bearings: [
                {
                    direction1: "N",
                    degrees: 90,
                    minutes: 0,
                    seconds: 0,
                    direction2: "W",
                    distance: 889.46,
                    unit: "feet"
                },
                {
                    direction1: "N",
                    degrees: 90,
                    minutes: 0,
                    seconds: 0,
                    direction2: "W",
                    distance: 889.46,
                    unit: "feet"
                },
                {
                    direction1: "N",
                    degrees: 90,
                    minutes: 0,
                    seconds: 0,
                    direction2: "W",
                    distance: 889.46,
                    unit: "feet"
                },
                {
                    direction1: "N",
                    degrees: 90,
                    minutes: 0,
                    seconds: 0,
                    direction2: "W",
                    distance: 889.46,
                    unit: "feet"
                }
            ]
        })
        console.log(result)
        expect(true).toBeTruthy()
    })
})
