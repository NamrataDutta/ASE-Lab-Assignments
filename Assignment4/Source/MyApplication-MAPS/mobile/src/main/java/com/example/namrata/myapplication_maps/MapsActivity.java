package com.example.namrata.myapplication_maps;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Geocoder;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.google.android.gms.identity.intents.Address;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

import java.io.IOException;
import java.util.List;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
    }
    public void onSearch(View view)
    {
        EditText etSearch =(EditText) findViewById(R.id.etSearch);
        String location = etSearch.getText().toString();
        List<android.location.Address> addressList = null;
        if

                (location!= null || !location.equals("")
                )
        {
            Geocoder geocoder = new Geocoder(this);
            try {

                addressList= geocoder.getFromLocationName(location, 1);
            } catch (IOException e) {
                e.printStackTrace();
            }
 android.location.Address address = addressList.get(0);
            LatLng latlng = new LatLng(address.getLatitude(),address.getLongitude());
            mMap.addMarker(new MarkerOptions().position(latlng).title("Marker in Current Location"));
            mMap.animateCamera(CameraUpdateFactory.newLatLng(latlng));
        }

    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;


        LatLng kan = new LatLng(39.038121, -94.569596);
        mMap.addMarker(new MarkerOptions().position(kan).title("Marker in Current Location"));
        mMap.moveCamera(CameraUpdateFactory.newLatLng(kan));
        if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        mMap.setMyLocationEnabled(true);


        final Button ButLogout = (Button) findViewById(R.id.ButLogout);

        ButLogout.setOnClickListener(new View.OnClickListener() {
            @Override

            public void onClick(View v) {
                Intent LogoutIntent = new Intent(MapsActivity.this, LoginActivity.class);
                MapsActivity.this.startActivity(LogoutIntent);

            }
        });
    }
    }


