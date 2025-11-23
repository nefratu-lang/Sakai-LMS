
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, NetworkScene } from './components/QuantumScene';
import { SakaiModulesDiagram, LTIIntegrationDiagram, StrengthsDiagram } from './components/Diagrams';
import { SakaiVsCanvas } from './components/SakaiVsCanvas';
import { SakaiWalkthrough } from './components/SakaiWalkthrough';
import { ArrowDown, Menu, X, BookOpen, Users, Layers, BarChart2, Shield, Plug, Video, FileText, MessageSquare, School, MonitorPlay, ExternalLink, Lightbulb, PenTool, DollarSign, ChevronRight, Info, ArrowRight, FileCheck, CheckCircle, Globe, Wrench, Smartphone, Server, PlayCircle } from 'lucide-react';

// --- Types ---
interface FeatureDetail {
    id: string;
    title: string;
    icon: any;
    shortDesc?: string;
    fullDesc: React.ReactNode;
}

interface FeatureCardProps {
    feature: FeatureDetail;
    onClick: () => void;
    delay: string;
}

interface SidePanelProps {
    feature: FeatureDetail | null;
    onClose: () => void;
}

// --- Components ---

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, onClick, delay }) => {
  const Icon = feature.icon;
  return (
    <button 
        onClick={onClick}
        className="flex flex-col group animate-fade-in-up items-start p-8 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full hover:border-sakai-blue/50 text-left relative overflow-hidden" 
        style={{ animationDelay: delay }}
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity text-sakai-blue text-xs font-bold uppercase tracking-wider flex items-center gap-1">
          Detay <ArrowRight size={14} />
      </div>
      <div className="p-3 bg-slate-50 rounded-lg mb-4 text-sakai-blue group-hover:bg-sakai-blue group-hover:text-white transition-colors">
        <Icon size={24} />
      </div>
      <h3 className="font-serif text-xl text-slate-900 mb-3">{feature.title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{feature.shortDesc}</p>
    </button>
  );
};

// SLIDING SIDE PANEL (DRAWER)
const SidePanel: React.FC<SidePanelProps> = ({ feature, onClose }) => {
    const isOpen = !!feature;
    
    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Sliding Panel */}
            <div className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                
                {feature && (
                    <>
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-sakai-blue/10 text-sakai-blue rounded-xl shadow-inner">
                                    <feature.icon size={28} />
                                </div>
                                <div>
                                    <h3 className="font-serif text-2xl text-slate-900 font-bold leading-tight">{feature.title}</h3>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Detaylı İnceleme</span>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-8 bg-white">
                             <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-sakai-blue prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 prose-strong:text-slate-900">
                                 {feature.fullDesc}
                             </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
                            <button onClick={onClose} className="px-8 py-3 bg-sakai-blue text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2">
                                <CheckCircle size={18} /> Okudum, Kapat
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

// Component for highlighting key academic points
const SpeakerNote = ({ title, text }: { title: string, text: string }) => (
    <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg flex gap-4 items-start shadow-sm">
        <Lightbulb className="text-amber-600 shrink-0 mt-1" size={20} />
        <div>
            <h4 className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-1">{title}</h4>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">{text}</p>
        </div>
    </div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<FeatureDetail | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // --- DATA: Deep Content from PDF Report ---
  
  // 1. Introduction Cards Data
  const introFeatures: FeatureDetail[] = [
      {
          id: 'target',
          title: "Hedef Kitle & Amaç",
          icon: School,
          shortDesc: "Doğrudan Yüksek Öğretim (Üniversiteler) ve Akademik Araştırma Toplulukları için tasarım.",
          fullDesc: (
              <>
                  <div className="p-4 bg-blue-50 border-l-4 border-sakai-blue rounded mb-6 text-sm text-blue-900 italic">
                      "Sakai, genel geçer bir eğitim yazılımı değildir. Doğrudan akademik ihtiyaçlar gözetilerek tasarlanmıştır."
                  </div>
                  
                  <h4>Akademik Dil ve Yapı</h4>
                  <p>
                      Sakai, akademik dünyanın dilinden anlayan bir sistemdir. Ticari LMS'lerin aksine, sadece ders anlatımı için değil; 
                      üniversitelerdeki komite çalışmaları, araştırma projeleri ve idari işbirlikleri için özel olarak kurgulanmıştır.
                  </p>
                  
                  <h4>Ölçeklenebilir Mimari</h4>
                  <p>
                      Dünya genelinde yüzlerce üniversite tarafından kullanılan sistem, yüz binlerce kullanıcıyı aynı anda destekleyebilecek 
                      güvenilir ve ölçeklenebilir bir Java tabanlı mimariye sahiptir.
                  </p>

                  <h4>Kimler İçin?</h4>
                  <ul>
                      <li><strong>Üniversiteler & Kolejler:</strong> Kampüs geneli öğrenme yönetimi.</li>
                      <li><strong>Araştırma Grupları:</strong> Ortak çalışma ve dosya paylaşım alanları (Project Sites).</li>
                  </ul>
              </>
          )
      },
      {
          id: 'roles',
          title: "Roller & Realms",
          icon: Users,
          shortDesc: "Esnek 'Realm' yapısı ile her dersin ihtiyacına göre yetkiler (Maintainer, Participant) özelleştirilebilir.",
          fullDesc: (
              <>
                  <h4>Rol Matrisi: Realms</h4>
                  <p>
                      Sakai'de yetki yönetimi <strong>"Realm"</strong> adı verilen alanlarla yapılır. Sistem varsayılan olarak şu rolleri sunar:
                  </p>
                  <ul>
                      <li><strong>Instructor (Maintainer/Site Owner):</strong> Tam yetkili eğitmen. İçerik düzenler, not verir, siteyi yayınlar.</li>
                      <li><strong>Student (Participant):</strong> İçeriği görüntüler, ödev yükler, tartışmalara katılır.</li>
                      <li><strong>Teaching Assistant (TA):</strong> Eğitmenin belirlediği kısıtlı yetkilere (örn. sadece notlandırma) sahiptir.</li>
                  </ul>

                  <h4>Esneklik: "Bu rollerle sınırlı değilsiniz"</h4>
                  <p>
                      Sakai'nin en büyük gücü, bu rolleri <strong>Site Editor</strong> aracıyla en ince ayrıntısına kadar özelleştirebilmesidir.
                      Örneğin; bir asistana sadece "Ödev Okuma" yetkisi verip, "Sınav Hazırlama" yetkisini kısıtlayabilirsiniz.
                  </p>

                  <h4>Kimlik Doğrulama (SSO)</h4>
                  <p>LDAP, Active Directory ve CAS/Shibboleth desteği ile kurumun mevcut şifreleriyle giriş yapılır.</p>
              </>
          )
      },
      {
          id: 'automation',
          title: "Otomasyon & ÖBS",
          icon: Layers,
          shortDesc: "Öğrenci Bilgi Sistemleri (ÖBS) ile entegre çalışır. Kullanıcı yönetimi için Site Editor kullanılır.",
          fullDesc: (
              <>
                  <h4>Entegre Kayıt Modelleri</h4>
                  <p>
                      Sakai, <strong>Öğrenci Bilgi Sistemleri (ÖBS)</strong> ile gerçek zamanlı konuşabilir.
                      Öğrenci, dönem başında ders kaydını yaptığı an, entegrasyon sayesinde Sakai'deki dersine de otomatik olarak atanır.
                  </p>

                  <h4>Site Editor & Toplu İşlemler</h4>
                  <p>
                      <strong>Site Editor</strong> aracı, site yapısını ve kullanıcıları yönetmek için merkezi bir kontrol panelidir.
                      Tek tek kayıt yapmak yerine, CSV dosyalarıyla binlerce kullanıcı saniyeler içinde sisteme yüklenebilir.
                  </p>

                  {/* VIDEO DEMO SECTION */}
                  <div className="my-6">
                      <div className="flex items-center gap-2 mb-2 text-sm font-bold text-slate-700">
                         <PlayCircle size={18} className="text-sakai-blue"/> 
                         Video: CSV ile Toplu Kullanıcı Ekleme
                      </div>
                      <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm relative aspect-video bg-slate-100 group">
                          <video 
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                          >
                              <source src="/videos/csv-upload.mp4" type="video/mp4" />
                              Tarayıcınız video etiketini desteklemiyor.
                          </video>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 italic text-center">
                          Simülasyon: Kullanıcı verilerinin toplu içe aktarılması.
                      </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 text-green-800 rounded border border-green-200 text-sm">
                      <strong>Sonuç:</strong> Eğitmenin "öğrenci ekleme" yükü ortadan kalkar, sistem tamamen otomatik işler.
                  </div>
              </>
          )
      }
  ];

  // 2. Module Details Data (For Diagram Clicks)
  const moduleDetails: Record<number, FeatureDetail> = {
      0: {
          id: 'lessons',
          title: "Lessons (Ders Oluşturucu)",
          icon: BookOpen,
          fullDesc: (
              <>
                  <p><strong>Ders Oluşturma Aracı (Lesson Builder)</strong>, Sakai'nin en güçlü pedagojik aracıdır. Eğitmenlerin içeriği modüler sayfalar halinde yapılandırmasını sağlar.</p>
                  
                  <h4>Öne Çıkan Özellikler:</h4>
                  <ul>
                      <li><strong>Sıralı Öğrenme (Scaffolding):</strong> İçerikleri belirli bir sıraya koyarak öğrencinin adım adım ilerlemesini sağlar. "Bu videoyu izlemeden teste giremezsin" kuralı konulabilir (Prerequisite).</li>
                      <li><strong>Şartlı Erişim (Conditional Release):</strong> Belirli bir başarı notunu almayan öğrenciye sonraki modül açılmaz.</li>
                      <li><strong>Çoklu Ortam Desteği:</strong> Metin, video, dosya, test ve ödevler tek bir sayfada iç içe (embedded) sunulabilir.</li>
                  </ul>
                  <p>Sakai 11 ve sonrası sürümlerde "Morpheus" arayüzü ile tamamen mobil uyumlu hale gelmiştir.</p>

                  {/* VIDEO SECTION FOR LESSONS */}
                  <div className="my-6">
                      <div className="flex items-center gap-2 mb-2 text-sm font-bold text-slate-700">
                         <PlayCircle size={18} className="text-sakai-blue"/> 
                         Canlı Önizleme: Lessons Aracı
                      </div>
                      <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm relative aspect-video bg-slate-100 group">
                          <video 
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                          >
                              <source src="/videos/lessons-demo.mp4" type="video/mp4" />
                              Tarayıcınız video etiketini desteklemiyor.
                          </video>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 italic text-center">
                          Ders içeriğinin modüler yapıda sürükle-bırak ile düzenlenmesi.
                      </p>
                  </div>
              </>
          )
      },
      1: {
          id: 'assignments',
          title: "Ödevler (Assignments)",
          icon: FileText,
          fullDesc: (
              <>
                  <p>Ödevler aracı, öğrenci teslimatlarını yönetmek için kapsamlı bir çözüm sunar. Sadece dosya yükleme değil, doğrudan metin girişi de destekler.</p>
                  
                  <h4>Teknik Detaylar:</h4>
                  <ul>
                      <li><strong>Drop Box:</strong> Her öğrencinin eğitmenle özel dosya paylaşabileceği kişisel klasör yapısı sunar.</li>
                      <li><strong>Turnitin Entegrasyonu:</strong> Öğrenci ödevini yüklediği anda, sistem arka planda Turnitin (veya benzeri) intihal servisine bağlanır ve benzerlik raporunu çeker.</li>
                      <li><strong>Akran Değerlendirme (Peer Review):</strong> Öğrencilerin birbirlerinin ödevlerini (anonim veya açık) değerlendirmesine olanak tanır.</li>
                      <li><strong>Inline Grading:</strong> Eğitmenler Word/PDF dosyalarını indirmeden tarayıcı üzerinde notlandırabilir.</li>
                  </ul>

                  {/* VIDEO SECTION FOR ASSIGNMENTS */}
                  <div className="my-6">
                      <div className="flex items-center gap-2 mb-2 text-sm font-bold text-slate-700">
                         <PlayCircle size={18} className="text-sakai-blue"/> 
                         Canlı Önizleme: Ödevler
                      </div>
                      <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm relative aspect-video bg-slate-100 group">
                          <video 
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                          >
                              <source src="/videos/assignments-demo.mp4" type="video/mp4" />
                              Tarayıcınız video etiketini desteklemiyor.
                          </video>
                      </div>
                  </div>
              </>
          )
      },
      2: {
          id: 'tests',
          title: "Sınav ve Quizler",
          icon: PenTool,
          fullDesc: (
              <>
                  <p>Tests & Quizzes aracı, Sakai'nin en karmaşık ve güçlü modülüdür. Basit anketlerden, yüksek güvenlikli final sınavlarına kadar her şeyi yönetir.</p>
                  
                  <h4>Gelişmiş Özellikler:</h4>
                  <ul>
                      <li><strong>Madde Analizi (Item Analysis):</strong> Sınav sonrası her sorunun ayırt edicilik ve güçlük indeksini raporlar. Hangi sorunun "kötü" veya "çok zor" olduğunu istatistiksel olarak gösterir.</li>
                      <li><strong>Soru Tipleri:</strong> Çoktan seçmeli, Doğru/Yanlış, Eşleştirme, Boşluk Doldurma, Sesli Yanıt, Hot Spot (Resim işaretleme) ve Hesaplamalı sorular.</li>
                      <li><strong>Soru Havuzları:</strong> Sorular havuzlarda saklanır ve her öğrenciye havuzdan rastgele soru çekilerek kopya riski azaltılır.</li>
                  </ul>

                  {/* VIDEO SECTION FOR TESTS */}
                  <div className="my-6">
                      <div className="flex items-center gap-2 mb-2 text-sm font-bold text-slate-700">
                         <PlayCircle size={18} className="text-sakai-blue"/> 
                         Canlı Önizleme: Sınav Oluşturma
                      </div>
                      <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm relative aspect-video bg-slate-100 group">
                          <video 
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                          >
                              <source src="/videos/tests-demo.mp4" type="video/mp4" />
                              Tarayıcınız video etiketini desteklemiyor.
                          </video>
                      </div>
                  </div>
              </>
          )
      },
      3: {
          id: 'forum',
          title: "Forum & İletişim",
          icon: MessageSquare,
          fullDesc: (
              <>
                  <p>Akademik tartışmaların yürütüldüğü asenkron iletişim merkezidir. Konu bazlı (Threaded) tartışma yapısına sahiptir.</p>
                  <h4>İşlevler:</h4>
                  <ul>
                      <li><strong>Puanlama:</strong> Eğitmen, öğrencinin foruma yazdığı cevabı doğrudan puanlayıp Not Defterine (Gradebook) gönderebilir.</li>
                      <li><strong>İstatistikler:</strong> Hangi öğrenci kaç mesaj attı, kaçını okudu raporlanabilir.</li>
                      <li><strong>Conversations:</strong> Sakai 23+ sürümlerinde gelen yeni özellik, sosyal medya tarzı hızlı ve modern bir tartışma akışı sunar.</li>
                  </ul>

                  {/* VIDEO SECTION FOR FORUM */}
                  <div className="my-6">
                      <div className="flex items-center gap-2 mb-2 text-sm font-bold text-slate-700">
                         <PlayCircle size={18} className="text-sakai-blue"/> 
                         Canlı Önizleme: Tartışma Forumları
                      </div>
                      <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm relative aspect-video bg-slate-100 group">
                          <video 
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                          >
                              <source src="/videos/forum-demo.mp4" type="video/mp4" />
                              Tarayıcınız video etiketini desteklemiyor.
                          </video>
                      </div>
                  </div>
              </>
          )
      },
      4: {
          id: 'gradebook',
          title: "Not Defteri (Gradebook)",
          icon: CheckCircle,
          fullDesc: (
              <>
                  <p>Dersin tüm ölçme verilerinin toplandığı merkezi veri tabanıdır. Ödevlerden ve Sınavlardan gelen notlar buraya otomatik akar.</p>
                  <h4>Özellikler:</h4>
                  <ul>
                      <li><strong>Ağırlıklı Puanlama:</strong> "Vize %30, Final %50, Ödev %20" gibi ağırlıklandırmalar yapılabilir.</li>
                      <li><strong>Rubrikler (Rubrics):</strong> Dereceli puanlama anahtarları oluşturularak şeffaf ve adil notlandırma sağlanır. Öğrenci puanının nereden kırıldığını görür.</li>
                      <li><strong>İçe/Dışa Aktarım:</strong> Excel dosyalarıyla toplu not girişi veya yedeği alınabilir.</li>
                  </ul>

                  {/* VIDEO SECTION FOR GRADEBOOK */}
                  <div className="my-6">
                      <div className="flex items-center gap-2 mb-2 text-sm font-bold text-slate-700">
                         <PlayCircle size={18} className="text-sakai-blue"/> 
                         Canlı Önizleme: Not Defteri
                      </div>
                      <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm relative aspect-video bg-slate-100 group">
                          <video 
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                          >
                              <source src="/videos/gradebook-demo.mp4" type="video/mp4" />
                              Tarayıcınız video etiketini desteklemiyor.
                          </video>
                      </div>
                  </div>
              </>
          )
      },
      5: {
          id: 'resources',
          title: "Kaynaklar (Resources)",
          icon: BarChart2,
          fullDesc: (
              <>
                  <p>Ders materyallerinin barındırıldığı dosya deposudur. WebDAV desteği sayesinde bilgisayarınızdaki bir klasör gibi yönetilebilir.</p>
                  <h4>Detaylar:</h4>
                  <ul>
                      <li><strong>Erişim Kontrolü:</strong> Dosyaların görünürlük tarihleri ayarlanabilir (örn. "Sınavdan sonra görünsün").</li>
                      <li><strong>Telif Hakkı Yönetimi:</strong> Yüklenen materyallerin telif durumu (Copyright status) işaretlenebilir.</li>
                      <li><strong>HTML Sayfalar:</strong> Sadece dosya değil, doğrudan tarayıcıda açılan HTML sayfalar oluşturulabilir.</li>
                  </ul>

                  {/* VIDEO SECTION FOR RESOURCES */}
                  <div className="my-6">
                      <div className="flex items-center gap-2 mb-2 text-sm font-bold text-slate-700">
                         <PlayCircle size={18} className="text-sakai-blue"/> 
                         Canlı Önizleme: Kaynak Yönetimi
                      </div>
                      <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm relative aspect-video bg-slate-100 group">
                          <video 
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                          >
                              <source src="/videos/resources-demo.mp4" type="video/mp4" />
                              Tarayıcınız video etiketini desteklemiyor.
                          </video>
                      </div>
                  </div>
              </>
          )
      }
  };

  // 3. Detailed Strengths & Weaknesses Data
  const strengthDetails: Record<string, FeatureDetail> = {
      'strength-opensource': {
          id: 'strength-opensource',
          title: "Açık Kaynak & Topluluk Gücü",
          icon: CheckCircle,
          fullDesc: (
              <>
                  <p>Sakai, ticari bir "Kara Kutu" değildir. Kaynak kodları tamamen açıktır ve Apereo Vakfı lisansı altında ücretsiz dağıtılır.</p>
                  <h4>Avantajları:</h4>
                  <ul>
                      <li><strong>Vendor Lock-in Yok:</strong> Bir şirkete bağımlı kalmazsınız. Yarın Instructure (Canvas) fiyatları %500 artırsa yapacak bir şeyiniz yoktur, ancak Sakai'de kodlar sizindir.</li>
                      <li><strong>Sürdürülebilirlik:</strong> Yazılımın geleceği bir şirketin kar marjına değil, küresel üniversite konsorsiyumunun ihtiyaçlarına bağlıdır.</li>
                      <li><strong>İnovasyon:</strong> Dünyanın en iyi üniversiteleri (Oxford, NYU, Duke) kendi geliştirdikleri özellikleri ana koda ekler.</li>
                  </ul>
              </>
          )
      },
      'strength-academic': {
          id: 'strength-academic',
          title: "Akademik DNA",
          icon: BookOpen,
          fullDesc: (
              <>
                  <p>Sakai, mühendisler tarafından değil, <strong>akademisyenler ve üniversiteler</strong> tarafından geliştirilmiştir. Bu, sistemin her hücresine işlemiştir.</p>
                  <h4>Neden Önemli?</h4>
                  <ul>
                      <li><strong>Özel İhtiyaçlar:</strong> Ticari LMS'lerin "gereksiz karmaşık" bulduğu özellikler (örn. çok detaylı yetki yönetimi, karmaşık not ağırlıklandırma), üniversiteler için hayati önem taşır ve Sakai'de standarttır.</li>
                      <li><strong>Araştırma Odaklılık:</strong> Sakai sadece ders (Course) için değil, Araştırma Projeleri (Project Sites) için de kullanılır. Bu özellik rakiplerde zayıftır.</li>
                  </ul>
              </>
          )
      },
      'strength-custom': {
          id: 'strength-custom',
          title: "Tam Özelleştirme (Kod Erişimi)",
          icon: Wrench,
          fullDesc: (
              <>
                  <p>Ticari bir LMS'te sadece "Logoyu" ve "Renkleri" değiştirebilirsiniz. Sakai'de ise <strong>her şeyi</strong> değiştirebilirsiniz.</p>
                  <h4>Örnekler:</h4>
                  <ul>
                      <li><strong>Yeni Araç Yazma:</strong> Üniversitenize özel bir "Staj Takip Modülü" mü lazım? Yazıp sisteme gömebilirsiniz.</li>
                      <li><strong>Entegrasyon:</strong> Kurumun kendi yazdığı eski bir veritabanı sistemiyle konuşması mı gerekiyor? API yazarak bağlayabilirsiniz.</li>
                  </ul>
              </>
          )
      },
      'strength-security': {
          id: 'strength-security',
          title: "Veri Güvenliği & Yerel Barındırma",
          icon: Shield,
          fullDesc: (
              <>
                  <p>Bulut tabanlı (SaaS) sistemlerde verileriniz şirketin sunucularındadır (genelde ABD veya Avrupa). Sakai'de ise veriler <strong>kendi kampüsünüzdeki sunucularda</strong> (On-Premise) durur.</p>
                  <h4>Kritik Avantajlar:</h4>
                  <ul>
                      <li><strong>KVKK & GDPR:</strong> Öğrenci verilerinin ülke dışına çıkmaması gerekiyorsa Sakai en güvenli limandır.</li>
                      <li><strong>Tam Kontrol:</strong> Veritabanına doğrudan erişiminiz vardır. İstediğiniz SQL sorgusunu atıp özel raporlar alabilirsiniz. Ticari sistemlerde bu imkansızdır.</li>
                  </ul>
              </>
          )
      },
      'weak-ux': {
          id: 'weak-ux',
          title: "Kullanıcı Deneyimi (UX)",
          icon: Smartphone,
          fullDesc: (
              <>
                  <p>Sakai'nin arayüzü, modern rakiplerine (Canvas, Brightspace) göre daha "geleneksel" ve "araç odaklı" kalabilir.</p>
                  <ul>
                      <li><strong>Öğrenme Eğrisi:</strong> Eğitmenlerin sisteme alışması biraz daha zaman alabilir. Menüler yoğundur.</li>
                      <li><strong>Görsellik:</strong> "Sürükle-Bırak" özellikleri veya minimalist tasarım konusunda ticari rakipler daha ileridedir.</li>
                  </ul>
              </>
          )
      },
      'weak-tco': {
          id: 'weak-tco',
          title: "TCO (Bakım Maliyeti)",
          icon: DollarSign,
          fullDesc: (
              <>
                  <p><strong>"Bedava Yavru Köpek" (Free Puppy) Metaforu:</strong> Yazılımı almak bedavadır ama onu "beslemek" masraflıdır.</p>
                  <ul>
                      <li><strong>IT Ekibi:</strong> Sunucuyu yönetecek, güncellemeleri yapacak yetkin Linux/Java uzmanlarına maaş ödemeniz gerekir.</li>
                      <li><strong>Donanım:</strong> Kendi sunucularınızı satın almalı ve elektriğini/soğutmasını karşılamalısınız.</li>
                  </ul>
              </>
          )
      },
      'weak-mobile': {
          id: 'weak-mobile',
          title: "Mobil Uygulama",
          icon: Smartphone,
          fullDesc: (
              <>
                  <p>Canvas veya Blackboard'un milyonlarca dolarlık bütçeyle geliştirdiği "Native" (Mağazadan indirilen) mobil uygulamaları çok gelişmiştir.</p>
                  <p>Sakai'nin resmi bir mobil uygulaması yoktur. Bunun yerine <strong>"Responsive Web Design"</strong> kullanır. Yani telefondan tarayıcı ile girildiğinde site mobile uyumlu hale gelir. İş görür, ancak "Native App" akıcılığını vermez.</p>
              </>
          )
      },
      'weak-tech': {
          id: 'weak-tech',
          title: "Teknik Uzmanlık Gereksinimi",
          icon: Server,
          fullDesc: (
              <>
                  <p>Sakai "Tak-Çalıştır" bir sistem değildir. Kurulumu ve konfigürasyonu karmaşıktır.</p>
                  <p>Küçük bir kolej veya teknik ekibi olmayan bir okul için Sakai'yi yönetmek çok zor olabilir. Bu kurumlar için Sakai'nin "Bulut Partnerleri" (Longsight gibi) devreye girer.</p>
              </>
          )
      }
  };

  const ltiFeatureDetail: FeatureDetail = {
      id: 'lti-deep',
      title: "LTI ve Entegrasyon Mimarisi",
      icon: Plug,
      fullDesc: (
          <>
              <h4>Learning Tools Interoperability (LTI)</h4>
              <p>Sakai, IMS Global'in LTI standardını en iyi uygulayan sistemlerden biridir. Bu standart, Sakai'nin "kapalı bir kutu" olmasını engeller ve onu bir "Entegrasyon Hub"ına dönüştürür.</p>
              
              <h4>Nasıl Çalışır?</h4>
              <ol>
                  <li><strong>Launch (Başlatma):</strong> Sakai, öğrencinin kimlik bilgilerini ve rolünü (Öğrenci/Eğitmen) şifreli bir paketle dış araca (örn. Zoom) gönderir.</li>
                  <li><strong>Tool Processing:</strong> Dış araç bu kimliği doğrular ve kullanıcıya özel içeriği açar (Tekrar şifre girmeye gerek kalmaz).</li>
                  <li><strong>Grade Passback (Not İadesi):</strong> LTI 1.3 Advantage standardı sayesinde, dış araçta yapılan bir sınavın notu, otomatik olarak Sakai Gradebook'a geri yazılır.</li>
              </ol>
              
              <h4>Desteklenen Araçlar:</h4>
              <p>Turnitin, Zoom, BigBlueButton, Gradescope, H5P, McGraw-Hill Connect ve yüzlerce diğer eğitim aracı.</p>
          </>
      )
  };

  const handleModuleClick = (index: number) => {
      if (moduleDetails[index]) {
          setSelectedFeature(moduleDetails[index]);
      }
  };

  const handleStrengthClick = (id: string) => {
      if (strengthDetails[id]) {
          setSelectedFeature(strengthDetails[id]);
      }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-slate-800 selection:bg-sakai-blue selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F0F4F8]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-sakai-blue rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm pb-1">S</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              SAKAI <span className="font-normal text-slate-500">LMS</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium tracking-wide text-slate-600">
            <a href="#intro" onClick={scrollToSection('intro')} className="hover:text-sakai-blue transition-colors cursor-pointer uppercase">Tanıtım</a>
            <a href="#features" onClick={scrollToSection('features')} className="hover:text-sakai-blue transition-colors cursor-pointer uppercase">Bileşenler</a>
            <a href="#demo" onClick={scrollToSection('demo')} className="hover:text-sakai-blue transition-colors cursor-pointer uppercase">Demo</a>
            <a href="#proscons" onClick={scrollToSection('proscons')} className="hover:text-sakai-blue transition-colors cursor-pointer uppercase">Analiz</a>
            <a href="#comparison" onClick={scrollToSection('comparison')} className="hover:text-sakai-blue transition-colors cursor-pointer uppercase">Sakai vs Canvas</a>
            
            <a 
                href="https://trysakai.longsight.com/portal/site/6bab8ed5-8859-40f4-8d8a-f50f9da06975" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 hover:bg-amber-200 rounded-full text-xs font-bold uppercase transition-colors border border-amber-200"
            >
                <ExternalLink size={14} /> Cloud Server
            </a>

            <div className="px-4 py-2 bg-slate-900 text-white rounded-full text-xs shadow-sm ml-2">
              Sercan UZUN
            </div>
          </div>

          <button className="md:hidden text-slate-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F0F4F8] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#intro" onClick={scrollToSection('intro')} className="hover:text-sakai-blue transition-colors cursor-pointer uppercase">Tanıtım</a>
            <a href="#features" onClick={scrollToSection('features')} className="hover:text-sakai-blue transition-colors cursor-pointer uppercase">Temel Bileşenler</a>
            <a href="#demo" onClick={scrollToSection('demo')} className="hover:text-sakai-blue transition-colors cursor-pointer uppercase">Arayüz Simülasyonu</a>
            <a href="#proscons" onClick={scrollToSection('proscons')} className="hover:text-sakai-blue transition-colors cursor-pointer uppercase">Güçlü Yönler</a>
            <a href="#comparison" onClick={scrollToSection('comparison')} className="hover:text-sakai-blue transition-colors cursor-pointer uppercase">Sakai vs Canvas</a>
            <a href="https://trysakai.longsight.com/portal/site/6bab8ed5-8859-40f4-8d8a-f50f9da06975" target="_blank" rel="noopener noreferrer" className="text-amber-700 font-bold flex items-center gap-2">
                <ExternalLink size={20} /> Cloud Server'a Git
            </a>
        </div>
      )}

      {/* Sliding Side Panel */}
      <SidePanel feature={selectedFeature} onClose={() => setSelectedFeature(null)} />

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(240,244,248,0.85)_0%,rgba(240,244,248,0.5)_50%,rgba(240,244,248,0.3)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-sakai-blue text-sakai-blue text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            UZE565 • Öğrenme Süreçlerinin Tasarımı
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-medium leading-tight md:leading-[0.9] mb-8 text-slate-900 drop-shadow-sm">
            Sakai LMS <br/><span className="italic font-normal text-slate-600 text-2xl md:text-4xl block mt-4">Akademik Dünyanın Dilinden Anlayan Sistem</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-700 font-light leading-relaxed mb-12">
            "Sadece bir ders yönetim aracı değil; araştırma, işbirliği ve akademik özgürlük için tasarlanmış açık kaynaklı bir ekosistem."
          </p>
          
          <div className="flex justify-center">
             <a href="#intro" onClick={scrollToSection('intro')} className="group flex flex-col items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">
                <span>İNCELEMEYE BAŞLA</span>
                <span className="p-2 border border-slate-300 rounded-full group-hover:border-slate-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction */}
        <section id="intro" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase">01. Giriş</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-slate-900">Neden Sakai?</h2>
              <div className="w-16 h-1 bg-sakai-blue mb-6"></div>
              <p className="text-slate-500 italic">
                  "Genel geçer bir yazılım değil, üniversiteler tarafından üniversiteler için geliştirilmiş bir yapı."
              </p>
              
              <SpeakerNote 
                  title="Sistem Felsefesi" 
                  text="Sakai'nin temel felsefesi: Sadece bir kurs yazılımı değil, tüm kampüsü kapsayan akademik bir ekosistemdir. Akademik Odak, Mobil Uyum ve Açık Kaynak mimarisi onu diğerlerinden ayırır." 
              />
            </div>
            <div className="md:col-span-8 text-lg text-slate-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-sakai-blue">S</span>akai LMS, ticari kaygılarla değil, akademik ihtiyaçlar gözetilerek tasarlanmıştır. Dünya genelinde yüzlerce üniversitenin (Yale, Oxford, Duke gibi) katkılarıyla <strong>Apereo Vakfı</strong> çatısı altında geliştirilir.
              </p>
              <p>
                Sistemin en büyük gücü <strong>Esneklik</strong> ve <strong>Akademik Odak</strong>tır. Bir kursun ötesinde, araştırma grupları ve proje ekipleri için de ortak çalışma alanları sunar.
              </p>
            </div>
          </div>
          
          {/* Roles Grid - NOW INTERACTIVE */}
          <div className="container mx-auto px-6 mt-16">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {introFeatures.map((feature, idx) => (
                     <FeatureCard 
                        key={idx}
                        feature={feature}
                        onClick={() => setSelectedFeature(feature)}
                        delay={`${idx * 0.1}s`}
                     />
                 ))}
             </div>
          </div>
        </section>

        {/* Basic Components: Modules Diagram */}
        <section id="features" className="py-24 bg-[#F0F4F8] border-t border-slate-200">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-slate-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-slate-200">
                            <BookOpen size={14}/> SAKAI'NİN KALBİ
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-slate-900">İçerik ve Yapılandırma</h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                           İşin mutfağına, yani <strong>Lessons (Modüller)</strong> aracına geldiğimizde Sakai farkını ortaya koyar. Burası klasik bir "dosya deposu" değildir.
                        </p>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            Öğretim tasarımcısı olarak öğrenciye <strong>sıralı bir öğrenme yolu</strong> çizebilirsiniz. 
                            <em>"Önce videoyu izle, sonra makaleyi oku, en son testi çöz"</em> şeklinde pedagojik bir akış (Scaffolding) kurgulayabilirsiniz.
                        </p>

                        <SpeakerNote 
                            title="Pedagojik Tasarım" 
                            text="Lessons (Modüller) aracı sistemin kalbidir. Öğrenciyi dağınık kaynaklar arasında kaybolmaktan kurtarır, hedefe yönelik sıralı bir yol sunar." 
                        />
                    </div>
                    <div>
                        <SakaiModulesDiagram onClick={handleModuleClick} />
                    </div>
                </div>
            </div>
        </section>

        {/* NEW: Walkthrough / Demo Simulation */}
        <section id="demo" className="py-24 bg-white border-t border-slate-200">
            <div className="container mx-auto px-6">
                 <div className="text-center mb-12">
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-sakai-blue text-xs font-bold tracking-widest uppercase rounded-full mb-4">
                        <MonitorPlay size={14}/> CANLI DEMO SİMÜLASYONU
                     </div>
                     <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-4">Uygulamalı Sistem Turu</h2>
                     <p className="text-slate-500 max-w-2xl mx-auto">
                        Sakai arayüzünde ders tasarımı, ölçme araçları ve grup yönetiminin nasıl yapıldığını adım adım inceleyin.
                     </p>
                </div>
                <SakaiWalkthrough />
            </div>
        </section>

        {/* Integration & Communication */}
        <section id="analytics" className="py-24 bg-slate-900 text-slate-100 overflow-hidden relative">
             <div className="absolute inset-0 opacity-20">
                <NetworkScene />
             </div>
             <div className="container mx-auto px-6 relative z-10">
                 <div className="max-w-4xl mx-auto text-center mb-16">
                     <div className="inline-block mb-3 text-xs font-bold tracking-widest text-sakai-accent uppercase">Veri ve İletişim</div>
                     <h2 className="font-serif text-4xl md:text-5xl mb-6">Sakai Veri Ekosistemi</h2>
                     <p className="text-lg text-slate-300 leading-relaxed">
                        Merkezi sunucu (Sakai Çekirdeği) ve ona bağlı modüller arasında sürekli akan veri trafiğini simüle eder.
                        Sistemin kapalı bir kutu olmadığını, <strong>LTI (Learning Tools Interoperability)</strong> protokolü sayesinde Zoom, Turnitin ve kütüphane veritabanlarıyla anlık konuştuğunu gösterir.
                     </p>
                 </div>

                 <LTIIntegrationDiagram />
                 
                 <div className="text-center mt-6">
                     <button 
                        onClick={() => setSelectedFeature(ltiFeatureDetail)}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-full text-sm font-bold uppercase transition-colors"
                     >
                         <Info size={16} /> Teknik Detayları İncele
                     </button>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                     <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
                        <h3 className="flex items-center gap-2 text-xl font-serif mb-4 text-white">
                            <Plug className="text-sakai-accent"/> Entegrasyon Gücü
                        </h3>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            "Sakai bir <strong>LEGO</strong> gibidir. İhtiyacınız olan parçayı (aracı) alıp takarsınız."
                        </p>
                        <p className="text-slate-400 text-sm">
                            LTI standardı, Sakai'nin evrensel bir "priz" gibi çalışmasını sağlar. Zoom veya BigBlueButton entegrasyonu kod yazmadan yapılır.
                        </p>
                     </div>
                     <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
                        <h3 className="flex items-center gap-2 text-xl font-serif mb-4 text-white">
                            <MessageSquare className="text-sakai-accent"/> İletişim Kanalları
                        </h3>
                         <p className="text-slate-300 leading-relaxed mb-4">
                            "Sakai sadece bir site değildir, öğrencinin cebindeki e-postaya kadar ulaşır."
                        </p>
                        <p className="text-slate-400 text-sm">
                            Duyurular, mesajlar ve bildirimler entegredir. Öğrenci "görmedim" diyemez, çünkü sistem onu hem platform içinde hem de e-posta ile "dürtükler".
                        </p>
                     </div>
                 </div>
             </div>
        </section>

        {/* Strengths & Weaknesses */}
        <section id="proscons" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                     <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase">Analiz</div>
                     <h2 className="font-serif text-4xl md:text-5xl mb-4 text-slate-900">Güçlü Yönler ve Sınırlılıklar</h2>
                     <p className="text-slate-500">Objektif bir bakış açısıyla sistemin artıları ve eksileri.</p>
                </div>
                
                <StrengthsDiagram onClick={handleStrengthClick} />
                
                <div className="mt-8 max-w-3xl mx-auto p-6 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:border-sakai-blue hover:shadow-md transition-all"
                     onClick={() => handleStrengthClick('weak-tco')}
                >
                     <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <DollarSign size={18} className="text-red-500"/>
                        Toplam Sahip Olma Maliyeti (TCO) <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded ml-auto">Detay için tıkla</span>
                     </h4>
                     <p className="text-slate-600 text-sm leading-relaxed">
                        Sakai yazılımı ücretsizdir (Lisans bedeli yok). Ancak literatürde buna <em>"Free Puppy" (Bedava Yavru Köpek)</em> denir. 
                        Yavru köpeği almak bedavadır ama maması, aşısı, bakımı masraflıdır. Sakai de böyledir...
                     </p>
                </div>
            </div>
        </section>

        {/* Comparison */}
        <section id="comparison" className="py-24 bg-[#F0F4F8]">
             <div className="container mx-auto px-6 flex flex-col items-center">
                 <div className="text-center mb-12">
                     <h2 className="font-serif text-4xl md:text-5xl mb-4 text-slate-900">Pazarın Devleri</h2>
                     <p className="text-slate-500">Sakai ve Canvas arasındaki temel felsefe farkları.</p>
                </div>
                <SakaiVsCanvas />
             </div>
        </section>

        {/* Conclusion */}
        <section className="py-24 bg-white border-t border-slate-200">
             <div className="container mx-auto px-6 text-center max-w-4xl">
                 <div className="w-16 h-16 bg-sakai-blue text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-sakai-blue/30 text-2xl font-serif font-bold">
                    S
                 </div>
                 <h2 className="font-serif text-4xl md:text-5xl mb-8 text-slate-900">Sonuç</h2>
                 <p className="text-xl text-slate-600 leading-relaxed mb-12">
                    "Sakai'yi tercih ettiğinizde sadece bir yazılımı değil, arkasındaki devasa küresel tecrübeyi kampüsünüze getirmiş oluyorsunuz. Notre Dame, Pepperdine gibi prestijli üniversitelerin kullandığı bu yapı, akademik özgürlüğün dijital kalesidir."
                 </p>
                 
                 <div className="flex flex-col md:flex-row justify-center gap-6 mt-12">
                     <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 flex-1">
                        <h4 className="font-bold text-slate-800 mb-2">Resmî Dokümantasyon</h4>
                        <p className="text-sm text-slate-500 mb-4">Apereo Vakfı rehberleri.</p>
                        <a href="https://www.apereo.org/programs/software/sakai-lms" target="_blank" rel="noopener noreferrer" className="text-sakai-blue font-bold text-sm hover:underline">Ziyaret Et &rarr;</a>
                     </div>
                     <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 flex-1">
                        <h4 className="font-bold text-slate-800 mb-2">Topluluk Forumları</h4>
                        <p className="text-sm text-slate-500 mb-4">Google Groups & Slack.</p>
                        <a href="https://sakai.screenstepslive.com/s/sakai_help" target="_blank" rel="noopener noreferrer" className="text-sakai-blue font-bold text-sm hover:underline">Katıl &rarr;</a>
                     </div>
                     <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 flex-1">
                        <h4 className="font-bold text-slate-800 mb-2">Videolar & Öğreticiler</h4>
                        <p className="text-sm text-slate-500 mb-4">Eğitim serileri.</p>
                        <a href="https://www.youtube.com/@SakaiCLE" target="_blank" rel="noopener noreferrer" className="text-sakai-blue font-bold text-sm hover:underline">İzle &rarr;</a>
                     </div>
                 </div>
             </div>
        </section>

        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <span className="text-white font-serif font-bold text-lg">SAKAI LMS</span>
                    <span className="ml-2 text-xs opacity-50">v23.0</span>
                </div>
                <div className="text-sm">
                    &copy; 2025 Sercan UZUN • UZE565 Sunumu
                </div>
            </div>
        </footer>

      </main>
    </div>
  );
};

export default App;
