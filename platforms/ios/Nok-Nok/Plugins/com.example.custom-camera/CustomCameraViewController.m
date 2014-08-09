#import "CustomCamera.h"
#import "CustomCameraViewController.h"

@implementation CustomCameraViewController

// Entry point method
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
	self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
	if (self) {
		// Instantiate the UIImagePickerController instance
		self.picker = [[UIImagePickerController alloc] init];
        
		// Configure the UIImagePickerController instance
		self.picker.sourceType = UIImagePickerControllerSourceTypeCamera;
		self.picker.cameraCaptureMode = UIImagePickerControllerCameraCaptureModePhoto;
		self.picker.cameraDevice = UIImagePickerControllerCameraDeviceRear;
		self.picker.showsCameraControls = NO;
        
        
        CGSize screenSize = [[UIScreen mainScreen] bounds].size;   // 320 x 568
        
        float scale = screenSize.height / screenSize.width*3/4;  // screen height divided by the pickerController height ... or:  568 / ( 320*4/3 )
        
        CGAffineTransform translate=CGAffineTransformMakeTranslation(0,(screenSize.height - screenSize.width*4/3)*0.5);
        CGAffineTransform fullScreen=CGAffineTransformMakeScale(scale, scale);
        self.picker.cameraViewTransform =CGAffineTransformConcat(fullScreen, translate);
        
		// Make us the delegate for the UIImagePickerController
		self.picker.delegate = self;
        
		// Set the frames to be full screen
		CGRect screenFrame = [[UIScreen mainScreen] bounds];
        
        self.view.opaque = NO;
        self.view.backgroundColor = [UIColor clearColor];
		self.view.frame = screenFrame;
		self.picker.view.frame = screenFrame;
        
		// Set this VC's view as the overlay view for the UIImagePickerController
		self.picker.cameraOverlayView = self.view;
	}
	return self;
}

// Action method.  This is like an event callback in JavaScript.
-(IBAction) takePhotoButtonPressed:(id)sender forEvent:(UIEvent*)event {
	// Call the takePicture method on the UIImagePickerController to capture the image.
	[self.picker takePicture];
}

-(IBAction) dismissPicker:(id)sender forEvent:(UIEvent*)event {
	// Call the takePicture method on the UIImagePickerController to capture the image.
    [self.plugin imageCanceled];
}


    

// Delegate method.  UIImagePickerController will call this method as soon as the image captured above is ready to be processed.  This is also like an event callback in JavaScript.
-(void) imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info {
    
    
    
	// Get a reference to the captured image
	UIImage* image = [info objectForKey:UIImagePickerControllerOriginalImage];
    
    
	// Get a file path to save the JPEG
	//NSArray* paths = NSSearchPathForDirectoriesInDomains(NSTemporaryDirectory(), NSUserDomainMask, YES);
	//NSString* documentsDirectory = [paths objectAtIndex:0];
    NSString* documentsDirectory = NSTemporaryDirectory();
	NSString* filename = @"test.jpg";
	NSString* imagePath = [documentsDirectory stringByAppendingPathComponent:filename];
    /*
    //delete previous item
    NSArray* tmpDirectory = [[NSFileManager defaultManager] contentsOfDirectoryAtPath:NSTemporaryDirectory() error:NULL];
    for (NSString *file in tmpDirectory) {
        [[NSFileManager defaultManager] removeItemAtPath:imagePath error:NULL];
    }
    */
    
	// Get the image data (blocking; around 1 second)
	NSData* imageData = UIImageJPEGRepresentation(image, 0.5);
    
    
	// Write the data to the file
	[imageData writeToFile:imagePath atomically:YES];
    
    
	// Tell the plugin class that we're finished processing the image
	[self.plugin capturedImageWithPath:imagePath];
    
    
    
}

@end