package com.lifey.audio;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;


import android.Manifest;
import android.content.pm.PackageManager;
import android.media.MediaPlayer; // -> za predvajanje
import android.media.MediaRecorder; // -> za rekordanje
import android.support.annotation.NonNull;
import android.util.Log;
import java.io.IOException;
import java.io.File;
import android.os.Environment;
import android.os.Handler;

public class Audio extends ReactContextBaseJavaModule {

  private static final String LOG_TAG = "AudioRecordTest";
  private static final int REQUEST_RECORD_AUDIO_PERMISSION = 200;

  private MediaRecorder mRecorder = null;
  private MediaPlayer   mPlayer = null;

  // Requesting permission to RECORD_AUDIO
  private boolean permissionToRecordAccepted = false;
  private String [] permissions = {Manifest.permission.RECORD_AUDIO};

  public File audioFile;

  public Audio(ReactApplicationContext reactContext) {
    super(reactContext);
  }
  @Override
  public String getName() {
    return "Audio";
  }


/*  @Override
  public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
      super.onRequestPermissionsResult(requestCode, permissions, grantResults);
      switch (requestCode){
          case REQUEST_RECORD_AUDIO_PERMISSION:
              permissionToRecordAccepted  = grantResults[0] == PackageManager.PERMISSION_GRANTED;
              break;
      }
      if (!permissionToRecordAccepted ) finish();

  }*/


  ///////// PLAYING ///////////////////////////////////////////////////////
  private void startPlaying() {
      mPlayer = new MediaPlayer();
      try {
          mPlayer.setDataSource(audioFile.getAbsolutePath());
          mPlayer.prepare();
          mPlayer.start();
      } catch (IOException e) {
          Log.e(LOG_TAG, "prepare() failed");
      }
  }

  private void startPlaying(String path){
    mPlayer = new MediaPlayer();
    try {
        mPlayer.setDataSource(path);
        mPlayer.prepare();
        mPlayer.start();
    } catch (IOException e) {
        Log.e(LOG_TAG, "prepare() failed");
    }
  }


  private void stopPlaying() {
      mPlayer.release();
      mPlayer = null;
  }


///////// RECORDING ///////////////////////////////////////////////////////
  private void startRecording() {
      mRecorder = new MediaRecorder();
      mRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
      mRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
      mRecorder.setOutputFile(audioFile.getAbsolutePath());
      mRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);

      try {
          mRecorder.prepare();
      } catch (IOException e) {
          Log.e(LOG_TAG, "prepare() failed");
      }

      mRecorder.start();
  }
  private void stopRecording() {
      mRecorder.stop();
      mRecorder.release();
      mRecorder = null;
  }

   @ReactMethod
  public void startRec(String fileName, int num) {
    audioFile = new File(Environment.getExternalStorageDirectory(),
                "Lifey/Audio/" + fileName +"-"+ num + ".3gp");
    startRecording();
    Toast.makeText(getReactApplicationContext(), "START RECORDING", 3).show();
  }
  @ReactMethod
  public void stopRec() {
    stopRecording();
    Toast.makeText(getReactApplicationContext(), "STOP RECORDING", 3).show();
  }

  @ReactMethod
  public void playRec(String fileName, int num) {
    audioFile = new File(Environment.getExternalStorageDirectory(),
                "Lifey/Audio/" + fileName +"-"+ num + ".3gp");
    startPlaying();
    Toast.makeText(getReactApplicationContext(), "Play", 3).show();
  }

  @ReactMethod
  public void deleteRec(String fileName, int num) {
    audioFile = new File(Environment.getExternalStorageDirectory(),
                "Lifey/Audio/" + fileName +"-"+ num + ".3gp");
    boolean deleted = audioFile.delete();
    Toast.makeText(getReactApplicationContext(), "Delete", 3).show();
  }



  /*
  * Constants, that can be used from react....
  */
    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";
    @Override
    public Map<String, Object> getConstants() {
       final Map<String, Object> constants = new HashMap<>();
       constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
       constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
       return constants;
    }
}
