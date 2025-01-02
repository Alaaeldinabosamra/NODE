/* eslint-disable */

// HTMLالحصول على البيانات من الـ
// const locationsData = JSON.parse(
// document.getElementById('map').dataset.locations,
// );
// const locationsData = JSON.parse(
//   document.getElementById('map').getAttribute('data-locations'),
// );
export const displayMap = (locationsData) => {
  const mapInfo = document.getElementById('map').dataset.info;
  console.log(locationsData, mapInfo);

  // التحقق من وجود عنصر الخريطة في الصفحة
  const mapElement = document.getElementById('map');
  if (mapElement) {
    // Leaflet إنشاء الخريطة باستخدام
    const map = L.map('map', {
      center: [37.5, -113.5], // تعيين الموقع الافتراضي
      zoom: 5, // تعيين مستوى التكبير الافتراضي
      // scrollWheelZoom: false, // تعطيل التكبير باستخدام عجلة الماوس
      // zoomControl: false, // تعطيل أزرار التكبير والتصغير
    }).setView([37.5, -113.5], 5); // ضبط الموقع الافتراضي للعرض على الخريطة

    // // (طبقة خريطة العادية) OpenStreetMap إضافة طبقة
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution:
    //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // }).addTo(map);

    // إضافة طبقة خريطة بيضاء ورمادية (CartoDB Light)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // // إضافة طبقة خريطة داكنة (CartoDB Dark)
    // L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    //   attribution:
    //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // }).addTo(map);

    // إضافة العلامات للمواقع المستوردة من البيانات
    locationsData.forEach((location) => {
      const { coordinates, description, day } = location;

      // // تغيير اللون باستخدام L.divIcon
      // const customIcon = L.divIcon({
      //   className: 'custom-icon', // يمكنك تخصيص الفئة لتعديل الستايل باستخدام CSS
      //   html: `<div style="background-color: red; width: 30px; height: 30px; border-radius: 50%; border: 2px solid white;"></div>`, // تحديد اللون هنا
      //   iconSize: [30, 30], // تحديد حجم الأيقونة
      // });

      const customIcon = L.icon({
        // iconUrl: '/img/mapIcon.png',
        iconUrl: '/img/pin.png', // استبدل بالرابط الخاص بالصورة PNG
        iconSize: [32, 32], // تحديد حجم الأيقونة
        iconAnchor: [16, 32], // النقطة التي سيتم تحديدها على الأيقونة
        popupAnchor: [0, -32], // النقطة التي سيتم تحديدها عند فتح النافذة المنبثقة
      });

      // إضافة العلامة على الخريطة مع معلومات من البيانات
      L.marker([coordinates[1], coordinates[0]], { icon: customIcon }) // [latitude, longitude]
        .addTo(map)
        .bindPopup(
          `<h3 class="popup-title">${description}</h3><p class="popup-day">Day: ${day}</p>`,
        );
    });

    // حساب الحدود التي تغطي جميع النقاط على الخريطة
    const bounds = new L.LatLngBounds();
    locationsData.forEach((location) => {
      bounds.extend([location.coordinates[1], location.coordinates[0]]);
    });

    // توسيع الخريطة لتشمل جميع النقاط باستخدام fitBounds مع إضافة padding
    map.fitBounds(bounds, {
      padding: [50, 50], // مسافة padding بين النقاط وحواف الخريطة
    });

    // // إضافة خطوط تربط النقاط مع بعضها
    const latLngs = locationsData.map((location) => [
      location.coordinates[1],
      location.coordinates[0],
    ]);
    L.polyline(latLngs, {
      // color: '#a9a9a9', // dark gray
      color: '#55c57a', // base green color
      opacity: 0.7,
      weight: 3, // سمك الخط
      opacity: 0.7, // شفافية الخط
      dashArray: '5, 10',
    }).addTo(map);
  }
};
