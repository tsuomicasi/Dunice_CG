package com.unact.yandexmapkitexample;

import android.app.Application;

import com.yandex.mapkit.MapKitFactory;

public class MainApplication extends Application {
  @Override
  public void onCreate() {
    super.onCreate();
    MapKitFactory.setLocale("ru_RU");
    MapKitFactory.setApiKey("ad624e5b-b328-4c28-90aa-ac784507f5d3");
  }
}
