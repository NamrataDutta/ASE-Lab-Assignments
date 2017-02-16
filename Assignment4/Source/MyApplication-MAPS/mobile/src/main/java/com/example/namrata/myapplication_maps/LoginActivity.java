package com.example.namrata.myapplication_maps;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        final EditText etUsername = (EditText) findViewById(R.id.etUsername);
        final EditText etSet = (EditText) findViewById(R.id.etSet);

        final Button butLogin = (Button) findViewById(R.id.butLogin);
        final TextView RegisterLink = (TextView) findViewById(R.id.RegisterNow);
        RegisterLink.setOnClickListener(new View.OnClickListener(){
            @Override

            public void onClick(View v){
                Intent RegisterIntent = new Intent(LoginActivity.this,RegisterActivity.class);
                LoginActivity.this.startActivity(RegisterIntent);
            }

        });
        butLogin.setOnClickListener(new View.OnClickListener() {
            @Override

            public void onClick(View v) {
                Intent LoginIntent = new Intent(LoginActivity.this, MapsActivity.class);
                LoginActivity.this.startActivity(LoginIntent);

            }
        });

    }
}
