package com.residentbedsideapp;

import com.facebook.react.ReactActivity;
import android.app.ActionBar;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.PixelFormat;
import android.nfc.NfcAdapter;
import android.nfc.Tag;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Toast;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.content.BroadcastReceiver;
//import android.app.KeyguardManager;

public class MainActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "residentBedsideApp";
    }

    NfcAdapter nfcAdapter;
    View decorView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        decorView = getWindow().getDecorView();
        hideSystemUI();
        setStatusBarBlocker(Gravity.TOP);
        setStatusBarBlocker(Gravity.BOTTOM);
        setStatusBarBlocker(Gravity.RIGHT);
        setStatusBarBlocker(Gravity.LEFT);

        //KeyguardManager keyguardManager = (KeyguardManager)getSystemService(MainActivity.KEYGUARD_SERVICE);
        //KeyguardLock lock = keyguardManager.newKeyguardLock(KEYGUARD_SERVICE);
        //lock.disableKeyguard();

        nfcAdapter = NfcAdapter.getDefaultAdapter(this);
        if(nfcAdapter != null && nfcAdapter.isEnabled()) {
            //Toast.makeText(this,"NFC available!!",Toast.LENGTH_LONG).show();
        }else{
            //Toast.makeText(this,"NFC not avaliable!!",Toast.LENGTH_LONG).show();
        }
    }

    @Override
    protected void onResume() {
        Intent intent = new Intent(this, MainActivity.class);
        intent.addFlags(intent.FLAG_RECEIVER_REPLACE_PENDING);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, 0);
        IntentFilter[] intentFilter = new IntentFilter[]{};
        nfcAdapter.enableForegroundDispatch(this, pendingIntent, intentFilter, null);

        hideSystemUI();
        super.onResume();
    }

    @Override
    protected void onPause(){
        nfcAdapter.disableForegroundDispatch(this);
        super.onPause();
    }

    @Override
    public boolean onTouchEvent(MotionEvent e) {
        hideSystemUI();
        return true;
    }

    private void setStatusBarBlocker(int gravity) {
        WindowManager manager = ((WindowManager) getApplicationContext().getSystemService(Context.WINDOW_SERVICE));

        WindowManager.LayoutParams localLayoutParams = new WindowManager.LayoutParams();
        localLayoutParams.type = WindowManager.LayoutParams.TYPE_SYSTEM_ERROR;
        localLayoutParams.gravity = gravity;
        localLayoutParams.flags = WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE |
        // this is to enable the notification to recieve touch events
        WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL |

        // Draws over status bar
        WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN;

        localLayoutParams.width = WindowManager.LayoutParams.MATCH_PARENT;
        localLayoutParams.height = (int) (35 * getResources().getDisplayMetrics().scaledDensity);

        localLayoutParams.format = PixelFormat.TRANSPARENT;

        customViewGroup view = new customViewGroup(this);
        manager.addView(view, localLayoutParams);
    }

    @Override
    public void onNewIntent(Intent intent) {
        Tag nfcTag = intent.getParcelableExtra("android.nfc.extra.TAG");

        if(nfcTag != null) {
            byte[] payLoad = new byte[]{};
            payLoad = nfcTag.getId();
            String tag = ByteArrayToHexString(payLoad);
            //Toast.makeText(this, tag, Toast.LENGTH_LONG).show();
        }else{
            //Toast.makeText(this, "No tag!", Toast.LENGTH_LONG).show();
        }
        super.onNewIntent(intent);
    }

    public void hideSystemUI() {
        decorView.setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
                        | View.SYSTEM_UI_FLAG_FULLSCREEN // hide status bar
                        | View.SYSTEM_UI_FLAG_IMMERSIVE);
        Log.v("mainActivity", "hideSystemUI");
    }

    private String ByteArrayToHexString(byte [] inarray) {
        int myInt = 0;
        int i = 0;
        int j = 0;
        String[] hex = {"0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"};
        String returnStr = "";
        for(j = 0 ; j < inarray.length ; j++){
            myInt = (int) inarray[j] & 0xff;
            i = (myInt >> 4) & 0x0f;
            returnStr += hex[i];
            i = myInt & 0x0f;
            returnStr += hex[i];
        }
        return returnStr;
    }

    public class BootUpReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            Intent i = new Intent(context, MainActivity.class);
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(i);
        }
    }

    @Override
    public void onBackPressed() {
    	// disable back button
    }
}
