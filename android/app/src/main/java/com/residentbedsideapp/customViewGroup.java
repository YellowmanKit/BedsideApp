package com.residentbedsideapp;

import android.content.Context;
import android.util.Log;
import android.view.MotionEvent;
import android.view.ViewGroup;

public class customViewGroup extends ViewGroup {

    MainActivity mainActivity = (MainActivity)getContext();

    public customViewGroup(Context context) {
        super(context);
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
        //Log.v("customViewGroup", "onInterceptTouchEvent");
        mainActivity.hideSystemUI();
        return true;
    }

    @Override
    public boolean onTouchEvent(MotionEvent e) {
        //Log.v("customViewGroup", "onTouchEvent");
        mainActivity.hideSystemUI();
        return true;
    }

}
