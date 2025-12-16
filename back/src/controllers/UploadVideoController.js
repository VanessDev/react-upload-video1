export function uploadVideoController(req, res) {
    console.log("test uploadController");
    return res.json({
        message: "test uploadController"
    })
}

export function testController(req, res) {
    console.log("test controller");
    return res.json({
        ok: true,
        message: "Route /api/video/test OK"
    });
}