package com.example.namrata.smartapplication;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;


public class PicActivity extends Activity {
    int TAKE_PHOTO_CODE = 0;
    ImageView userImage ;
    Bitmap photo;


//public class PicActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {


        super.onCreate(savedInstanceState);
        //getActionBar().setTitle("Capture image");
        setContentView(R.layout.activity_pic);
        Button capture = (Button) findViewById(R.id.t);
        userImage = (ImageView) findViewById(R.id.view_photo);
        //Button click eventlistener. Initializes the camera.
        capture.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                startActivityForResult(cameraIntent, TAKE_PHOTO_CODE);
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == TAKE_PHOTO_CODE && resultCode == RESULT_OK) {
            photo = (Bitmap) data.getExtras().get("data");
            userImage.setImageBitmap(photo);
            Log.d("CameraDemo", "Pic saved");
        }
    }

    public void onClickHome(View s){

        if(s.getId()==R.id.Bhome) {

            Intent h = new Intent(PicActivity.this, MapsActivity.class);
            // h.putExtra("ImageView", (Parcelable) userImage);
            // h.putExtra("bmp", (Parcelable) userImage);
            h.putExtra("Bitmap", photo);
            startActivity(h);

        }

    }
}
