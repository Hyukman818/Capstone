import { useEffect, useRef, useState } from 'react';
import { X, Navigation, RotateCw, Star } from 'lucide-react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface NearbyHospitalMapProps {
  onClose: () => void;
}

interface Hospital {
  id: string;
  place_name: string;
  category_name: string;
  road_address_name: string;
  address_name: string;
  phone: string;
  place_url: string;
  x: string;
  y: string;
}

const FAV_STORAGE_KEY = 'myHospitalFavs';

export function NearbyHospitalMap({ onClose }: NearbyHospitalMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [favorites, setFavorites] = useState<Hospital[]>([]);
  const [activeTab, setActiveTab] = useState<'search' | 'fav'>('search');
  const [showReSearch, setShowReSearch] = useState(false);

  const mapRef = useRef<any>(null);
  const psRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const myMarkerRef = useRef<any>(null);
  const infowindowRef = useRef<any>(null);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(FAV_STORAGE_KEY);
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Initialize Kakao Map
  useEffect(() => {
    const waitForKakao = () => {
      return new Promise<void>((resolve, reject) => {
        // 이미 로드되어 있는 경우
        if (window.kakao && window.kakao.maps) {
          resolve();
          return;
        }

        // 최대 5초 대기
        let attempts = 0;
        const maxAttempts = 50;
        const checkInterval = setInterval(() => {
          attempts++;
          if (window.kakao && window.kakao.maps) {
            clearInterval(checkInterval);
            resolve();
          } else if (attempts >= maxAttempts) {
            clearInterval(checkInterval);
            reject(new Error('Kakao Maps SDK 로드 타임아웃'));
          }
        }, 100);
      });
    };

    const initMap = () => {
      console.log('[지도 초기화] 시작');
      console.log('[지도 초기화] mapContainer.current:', mapContainer.current);

      if (!mapContainer.current) {
        console.error('[지도 초기화 실패] mapContainer가 없습니다!');
        return;
      }

      if (!window.kakao || !window.kakao.maps) {
        console.error('[지도 초기화 실패] Kakao Maps SDK가 로드되지 않았습니다!');
        return;
      }

      try {
        // 어린이대공원역 좌표
        const defaultCenter = new window.kakao.maps.LatLng(37.548, 127.074);
        const options = {
          center: defaultCenter,
          level: 4
        };

        console.log('[지도 초기화] 옵션:', options);
        console.log('[지도 초기화] 컨테이너 크기:', mapContainer.current.offsetWidth, 'x', mapContainer.current.offsetHeight);

        const kakaoMap = new window.kakao.maps.Map(mapContainer.current, options);
        const placesService = new window.kakao.maps.services.Places();
        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

        console.log('[지도 초기화] 완료:', kakaoMap);

        mapRef.current = kakaoMap;
        psRef.current = placesService;
        infowindowRef.current = infowindow;
      } catch (error) {
        console.error('[지도 초기화 실패] 에러:', error);
        alert('지도를 초기화하는데 실패했습니다. 페이지를 새로고침해주세요.');
        return;
      }

      // Get user location
      if (navigator.geolocation && mapRef.current) {
        const defaultCenter = new window.kakao.maps.LatLng(37.548, 127.074);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const loc = new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );
            if (mapRef.current) {
              mapRef.current.setCenter(loc);

              const myMarker = new window.kakao.maps.Marker({
                map: mapRef.current,
                position: loc,
                title: '내 위치'
              });
              myMarkerRef.current = myMarker;

              searchPlaces(loc);
            }
          },
          () => {
            // 위치 권한 거부 시 기본 위치에서 검색
            searchPlaces(defaultCenter);
          }
        );
      } else if (mapRef.current) {
        const defaultCenter = new window.kakao.maps.LatLng(37.548, 127.074);
        searchPlaces(defaultCenter);
      }

      // Map drag event
      if (mapRef.current) {
        window.kakao.maps.event.addListener(mapRef.current, 'dragend', () => {
          setShowReSearch(true);
        });
      }
    };

    waitForKakao()
      .then(() => {
        console.log('[Kakao Maps SDK] 로드 완료');
        // 지도 컨테이너가 렌더링된 후 초기화
        setTimeout(() => {
          initMap();
          // 지도 relayout 호출로 크기 재조정 (모바일 환경 고려)
          if (mapRef.current) {
            setTimeout(() => {
              mapRef.current.relayout();
            }, 300);

            // 추가 relayout (모바일 환경에서 안정적 렌더링)
            setTimeout(() => {
              mapRef.current.relayout();
            }, 600);
          }
        }, 200);
      })
      .catch((error) => {
        console.error('[Kakao Maps SDK 로드 실패]:', error);
        alert('지도를 불러오는데 실패했습니다. 페이지를 새로고침해주세요.');
      });

    return () => {
      if (myMarkerRef.current) {
        myMarkerRef.current.setMap(null);
      }
      removeMarkers();
    };
  }, []);

  const searchPlaces = (location: any) => {
    if (!psRef.current) return;

    psRef.current.categorySearch(
      'HP8',
      (data: Hospital[], status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setHospitals(data);
          displayMarkers(data);
          setActiveTab('search');
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          setHospitals([]);
          removeMarkers();
        }
      },
      { location, radius: 2000 }
    );
  };

  const displayMarkers = (places: Hospital[]) => {
    removeMarkers();
    if (!mapRef.current) return;

    places.forEach((place) => {
      const position = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = new window.kakao.maps.Marker({
        position,
        map: mapRef.current
      });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        displayInfowindow(marker, place);
      });

      markersRef.current.push(marker);
    });
  };

  const removeMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  const displayInfowindow = (marker: any, place: Hospital) => {
    const categoryParts = place.category_name.split(' > ');
    const specialty = categoryParts.length > 1 ? categoryParts[categoryParts.length - 1] : '병원';
    const isFav = isFavorite(place.id);

    const content = `
      <div style="padding:12px; font-size:13px; width:220px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <strong style="font-size:14px;">${place.place_name}</strong>
          <span style="color:${isFav ? '#fbc02d' : '#ccc'}; font-size:18px;">${isFav ? '★' : '☆'}</span>
        </div>
        <span style="background:#e0f7fa; color:#006064; font-size:11px; padding:3px 6px; border-radius:4px;">${specialty}</span>
        <div style="margin-top:6px; color:#666; font-size:12px;">${place.road_address_name || place.address_name}</div>
        <div style="margin-top:6px;"><a href="${place.place_url}" target="_blank" style="color:#3396ff; font-weight:600;">상세보기 →</a></div>
      </div>
    `;

    infowindowRef.current?.setContent(content);
    infowindowRef.current?.open(mapRef.current, marker);
  };

  const handleReSearch = () => {
    if (mapRef.current && psRef.current) {
      const center = mapRef.current.getCenter();
      searchPlaces(center);
      setShowReSearch(false);
    }
  };

  const handleMyLocation = () => {
    if (navigator.geolocation && mapRef.current && psRef.current) {
      navigator.geolocation.getCurrentPosition((position) => {
        const loc = new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        mapRef.current.panTo(loc);

        if (!myMarkerRef.current) {
          const myMarker = new window.kakao.maps.Marker({
            map: mapRef.current,
            position: loc,
            title: '내 위치'
          });
          myMarkerRef.current = myMarker;
        } else {
          myMarkerRef.current.setPosition(loc);
        }

        searchPlaces(loc);
        setShowReSearch(false);
      });
    }
  };

  const toggleFavorite = (hospital: Hospital) => {
    const index = favorites.findIndex((f) => f.id === hospital.id);
    let newFavorites;

    if (index !== -1) {
      newFavorites = favorites.filter((f) => f.id !== hospital.id);
    } else {
      newFavorites = [...favorites, hospital];
    }

    setFavorites(newFavorites);
    localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(newFavorites));
  };

  const isFavorite = (id: string) => {
    return favorites.some((f) => f.id === id);
  };

  const handleHospitalClick = (hospital: Hospital) => {
    if (mapRef.current) {
      const position = new window.kakao.maps.LatLng(hospital.y, hospital.x);
      mapRef.current.panTo(position);

      const marker = markersRef.current.find((m: any) => {
        const pos = m.getPosition();
        return pos.getLat() === Number(hospital.y) && pos.getLng() === Number(hospital.x);
      });

      if (marker) {
        displayInfowindow(marker, hospital);
      }
    }
  };

  const getSpecialty = (categoryName: string) => {
    const parts = categoryName.split(' > ');
    return parts.length > 1 ? parts[parts.length - 1] : '병원';
  };

  const getRandomRating = () => {
    return (Math.random() * 2 + 3).toFixed(1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white" style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden', touchAction: 'none' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between" style={{ flexShrink: 0, height: '64px' }}>
        <h2 className="text-lg font-bold text-gray-900">근처 병원 찾기</h2>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Map */}
      <div style={{ flex: '0 0 60%', position: 'relative', width: '100%', overflow: 'hidden', backgroundColor: '#f0f0f0', minHeight: '300px' }}>
        <div ref={mapContainer} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />

        {/* Re-search Button */}
        {showReSearch && (
          <button
            onClick={handleReSearch}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 rounded-full font-semibold text-white shadow-lg flex items-center gap-2"
            style={{ backgroundColor: '#3396ff' }}
          >
            <RotateCw className="w-4 h-4" />
            이 지역에서 다시 검색
          </button>
        )}

        {/* My Location Button */}
        <button
          onClick={handleMyLocation}
          className="absolute bottom-4 right-4 z-10 w-10 h-10 bg-white border border-gray-300 rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          title="내 위치 표시"
        >
          <Navigation className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col bg-gray-50" style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Tabs */}
        <div className="flex bg-white border-b border-gray-200" style={{ flexShrink: 0, height: '48px' }}>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 py-3 font-semibold text-sm transition-colors ${
              activeTab === 'search'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600'
            }`}
          >
            검색 결과 ({hospitals.length})
          </button>
          <button
            onClick={() => setActiveTab('fav')}
            className={`flex-1 py-3 font-semibold text-sm transition-colors flex items-center justify-center gap-1 ${
              activeTab === 'fav'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600'
            }`}
          >
            <Star className="w-4 h-4" />
            즐겨찾기 ({favorites.length})
          </button>
        </div>

        {/* List Content */}
        <div className="p-3" style={{ height: 'calc(100% - 48px)', overflowY: 'auto' }}>
          {activeTab === 'search' ? (
            hospitals.length > 0 ? (
              <div className="space-y-2">
                {hospitals.map((hospital) => (
                  <div
                    key={hospital.id}
                    onClick={() => handleHospitalClick(hospital)}
                    className="bg-white rounded-lg p-4 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 flex-1">{hospital.place_name}</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(hospital);
                        }}
                        className="text-xl leading-none"
                        style={{ color: isFavorite(hospital.id) ? '#fbc02d' : '#ccc' }}
                      >
                        {isFavorite(hospital.id) ? '★' : '☆'}
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block px-2 py-1 bg-cyan-50 text-cyan-700 text-xs font-medium rounded">
                        {getSpecialty(hospital.category_name)}
                      </span>
                      <span className="text-yellow-600 font-bold text-sm">★ {getRandomRating()}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">
                      {hospital.road_address_name || hospital.address_name}
                    </p>
                    {hospital.phone && (
                      <p className="text-xs font-medium text-blue-600">{hospital.phone}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">검색 결과가 없습니다</p>
              </div>
            )
          ) : (
            favorites.length > 0 ? (
              <div className="space-y-2">
                {favorites.map((hospital) => (
                  <div
                    key={hospital.id}
                    onClick={() => handleHospitalClick(hospital)}
                    className="bg-white rounded-lg p-4 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 flex-1">{hospital.place_name}</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(hospital);
                        }}
                        className="text-xl leading-none text-yellow-500"
                      >
                        ★
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block px-2 py-1 bg-cyan-50 text-cyan-700 text-xs font-medium rounded">
                        {getSpecialty(hospital.category_name)}
                      </span>
                      <span className="text-yellow-600 font-bold text-sm">★ {getRandomRating()}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">
                      {hospital.road_address_name || hospital.address_name}
                    </p>
                    {hospital.phone && (
                      <p className="text-xs font-medium text-blue-600">{hospital.phone}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Star className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">저장된 병원이 없습니다</p>
                <p className="text-xs text-gray-400 mt-1">병원 옆 별을 눌러 즐겨찾기에 추가하세요</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
