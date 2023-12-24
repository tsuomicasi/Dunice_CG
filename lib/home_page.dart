import 'package:flutter/material.dart';
import 'package:yandex_mapkit/yandex_mapkit.dart';
import 'map_point.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<HomePage> {
  late final YandexMapController yandexController;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: YandexMap(
        onMapCreated: (controller) async {
          yandexController = controller;
          await yandexController
              .moveCamera(CameraUpdate.newCameraPosition(const CameraPosition(
                  zoom: 13,
                  target: Point(
                    latitude: 47.208735,
                    longitude: 38.936694,
                  ))));
        },
        nightModeEnabled: true,
        mapObjects: _getPlacemarkObjects(context),
      ),
    );
  }
}

List<MapPoint> _getMapPoints() {
  return const [
    MapPoint(
        name: 'Хакатон CyberGarden', latitude: 47.202233, longitude: 38.935670),
    MapPoint(
        name: 'Октябрьская площадь', latitude: 47.209161, longitude: 38.935951),
    MapPoint(name: 'Сквер Петра', latitude: 47.204590, longitude: 38.946134),
  ];
}

List<PlacemarkMapObject> _getPlacemarkObjects(BuildContext context) {
  return _getMapPoints()
      .map(
        (point) => PlacemarkMapObject(
          mapId: MapObjectId('MapObject $point'),
          point: Point(latitude: point.latitude, longitude: point.longitude),
          opacity: 1,
          icon: PlacemarkIcon.single(
            PlacemarkIconStyle(
              image: BitmapDescriptor.fromAssetImage(
                'lib/assets/nigger.png',
              ),
              scale: 0.2,
            ),
          ),
          onTap: (_, __) => showModalBottomSheet(
            context: context,
            builder: (context) => _ModalBodyView(
              point: point,
            ),
          ),
        ),
      )
      .toList();
}

class _ModalBodyView extends StatelessWidget {
  const _ModalBodyView({required this.point});

  final MapPoint point;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 40),
      child: Column(mainAxisSize: MainAxisSize.min, children: [
        Text(point.name, style: const TextStyle(fontSize: 20)),
        const SizedBox(
          height: 20,
          width: double.infinity,
        ),
        Text(
          '${point.latitude}, ${point.longitude}',
          style: const TextStyle(
            fontSize: 16,
            color: Colors.grey,
          ),
        ),
      ]),
    );
  }
}
