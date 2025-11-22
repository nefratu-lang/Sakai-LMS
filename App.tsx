
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, NetworkScene } from './components/QuantumScene';
import { SakaiModulesDiagram, LTIIntegrationDiagram, StrengthsDiagram } from './components/Diagrams';
import { SakaiVsCanvas } from './components/SakaiVsCanvas';
import { SakaiWalkthrough } from './components/SakaiWalkthrough';
import { ArrowDown, Menu, X, BookOpen, Users, Layers, BarChart2, Shield, Plug, Video, FileText, MessageSquare, School, MonitorPlay, ExternalLink, Lightbulb, PenTool, DollarSign } from 'lucide-react';

const FeatureCard = ({ title, desc, icon: Icon, delay }: { title: string, desc: string, icon: any, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-start p-8 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 w-full hover:border-sakai-blue/50" style={{ animationDelay: delay }}>
      <div className="p-3 bg-slate-50 rounded-lg mb-4 text-sakai-blue group-hover:bg-sakai-blue group-hover:text-white transition-colors">
        <Icon size={24} />
      </div>
      <h3 className="font-serif text-xl text-slate-900 mb-3">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
};

// New Component for Presentation Cues based on PDF "Tips"
const SpeakerNote = ({ title, text }: { title: string, text: string }) => (
    <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg flex gap-4 items-start shadow-sm">
        <Lightbulb className="text-amber-600 shrink-0 mt-1" size={20} />
        <div>
            <h4 className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-1">{title}</h4>
            <p className="text-sm text-slate-700 italic">"{text}"</p>
        </div>
    </div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
            <a href="#proscons" onClick={scrollToSection('proscons')} className="hover:text-sakai-blue transition-colors cursor-pointer uppercase">Artı/Eksi</a>
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
                <span>SUNUMU BAŞLAT</span>
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
                  title="Önemli" 
                  text="Sakai'nin temel felsefesi: Sadece bir kurs yazılımı değil, tüm kampüsü kapsayan akademik bir ekosistemdir.Akademik Odak, Mobil Uyum ve Açık Kaynak." 
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
          
          {/* Roles Grid */}
          <div className="container mx-auto px-6 mt-16">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <FeatureCard 
                    title="Hedef Kitle" 
                    desc="Doğrudan Yüksek Öğretim (Üniversiteler, Kolejler) ve Akademik Araştırma Toplulukları." 
                    icon={School} 
                    delay="0s"
                 />
                 <FeatureCard 
                    title="Esnek Roller" 
                    desc="'Bu rollerle sınırlı değilsiniz.' Her dersin ihtiyacına göre asistan veya misafir yetkileri özelleştirilebilir." 
                    icon={Users} 
                    delay="0.1s"
                 />
                 <FeatureCard 
                    title="Otomasyon" 
                    desc="Öğrenci Bilgi Sistemleri (ÖBS) ile entegre çalışır. Kayıtlar otomatik akar, manuel iş yükü biter." 
                    icon={Layers} 
                    delay="0.2s"
                 />
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
                            title="SakaiLMS!" 
                            text="Lessons (Modüller) aracı sistemin kalbidir. Öğrenciyi dağınık kaynaklar arasında kaybolmaktan kurtarır, hedefe yönelik sıralı bir yol sunar" 
                        />
                    </div>
                    <div>
                        <SakaiModulesDiagram />
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
                
                <StrengthsDiagram />
                
                <div className="mt-8 max-w-3xl mx-auto p-6 bg-slate-50 rounded-xl border border-slate-200">
                     <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <DollarSign size={18} className="text-red-500"/>
                        Maliyet (TCO) Analizi: "Bedava Yavru Köpek" Metaforu
                     </h4>
                     <p className="text-slate-600 text-sm leading-relaxed">
                        Sakai yazılımı ücretsizdir (Lisans bedeli yok). Ancak literatürde buna <em>"Free Puppy" (Bedava Yavru Köpek)</em> denir. 
                        Yavru köpeği almak bedavadır ama maması, aşısı, bakımı masraflıdır. Sakai de böyledir; yazılıma para vermezsiniz ama sunucu ve bakım için bütçe ayırmalısınız.
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
