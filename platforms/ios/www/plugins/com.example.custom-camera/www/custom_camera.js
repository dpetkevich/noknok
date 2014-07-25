cordova.define("com.example.custom-camera.CustomCamera", function(require, exports, module) { var CustomCamera = {
	getPicture: function(success, failure){
		cordova.exec(success, failure, "CustomCamera", "openCamera", []);
	}
};

module.exports = CustomCamera;
});
