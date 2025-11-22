
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, NetworkScene } from './components/QuantumScene';
import { SakaiModulesDiagram, LTIIntegrationDiagram, StrengthsDiagram } from './components/Diagrams';
import { SakaiVsCanvas } from './components/SakaiVsCanvas';
import { SakaiWalkthrough } from './components/SakaiWalkthrough';
import { ArrowDown, Menu, X, BookOpen, Users, Layers, BarChart2, Shield, Plug, Video, FileText, MessageSquare, School, MonitorPlay, ExternalLink } from 'lucide-react';

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
            Sakai LMS <br/><span className="italic font-normal text-slate-600 text-2xl md:text-4xl block mt-4">Açık Kaynak Öğrenme Yönetim Sistemi</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-700 font-light leading-relaxed mb-12">
            Yüksek öğretim kurumları için tasarlanmış, esnek, özelleştirilebilir ve güçlü bir eğitim ekosistemi.
          </p>
          
          <div className="flex justify-center">
             <a href="#intro" onClick={scrollToSection('intro')} className="group flex flex-col items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">
                <span>İNCELEME GÜNDEMİ</span>
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
              <h2 className="font-serif text-4xl mb-6 leading-tight text-slate-900">Sistemin Tanıtımı ve Amacı</h2>
              <div className="w-16 h-1 bg-sakai-blue mb-6"></div>
            </div>
            <div className="md:col-span-8 text-lg text-slate-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-sakai-blue">S</span>akai LMS, öncelikli olarak yüksek öğretim kurumları (üniversiteler, kolejler) ve akademik araştırma toplulukları için tasarlanmış bir eğitim platformudur.
              </p>
              <p>
                Yazılım lisansı ücretsizdir (Apereo Lisansı) ancak kurumların kendi sunucularında barındırması veya ticari partnerlerden hizmet alması gerekir (TCO). Ana platform web tabanlıdır ve Sakai 20+ sürümleriyle tam duyarlı (responsive) mobil deneyim sunar.
              </p>
            </div>
          </div>
          
          {/* Roles Grid */}
          <div className="container mx-auto px-6 mt-16">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <FeatureCard 
                    title="Hedef Kitle" 
                    desc="Üniversiteler, Kolejler ve Akademik Topluluklar için optimize edilmiştir." 
                    icon={School} 
                    delay="0s"
                 />
                 <FeatureCard 
                    title="Dağıtım Modeli" 
                    desc="Yerel (On-Premise) kurulum veya Bulut hizmeti. Tamamen açık kaynak kodlu." 
                    icon={Layers} 
                    delay="0.1s"
                 />
                 <FeatureCard 
                    title="Rol Matrisi" 
                    desc="SSO, LDAP desteği ile Eğitmen, Öğrenci, Asistan ve Misafir rolleri için esnek yetkilendirme." 
                    icon={Shield} 
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
                            <BookOpen size={14}/> DERS İÇİ ÖĞELER
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-slate-900">Temel Bileşenler</h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                           Sakai, yapılandırmacı bir öğrenme deneyimi için güçlü araçlar sunar. <strong>Modüller (Lessons)</strong> aracı, içeriği, görevleri ve diğer araçları sıralı bir öğrenme yolunda birleştirir.
                        </p>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            Sistem, Ödevler (Turnitin entegreli), Sınavlar (Test & Quizzes) ve Rubrikler ile kapsamlı bir ölçme-değerlendirme altyapısı sağlar.
                        </p>
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
                        Gerçek Sakai arayüzü üzerinden içerik oluşturma, grup yönetimi ve ölçme araçlarının işleyişi.
                     </p>
                </div>
                <SakaiWalkthrough />
            </div>
        </section>

        {/* Integration & Communication */}
        <section id="analytics" className="py-24 bg-slate-900 text-slate-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-blue-600 blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-cyan-400 blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <LTIIntegrationDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 text-sakai-accent text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-slate-700">
                            <Plug size={14}/> ENTEGRASYONLAR
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Ekosistem Bağlantısı</h2>
                        <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                            Sakai'nin en güçlü yanlarından biri <strong>LTI (Learning Tools Interoperability)</strong> desteğidir. Zoom, BigBlueButton, Turnitin gibi modern araçlar sisteme sorunsuz entegre olur.
                        </p>
                        <ul className="space-y-4 text-slate-400">
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-sakai-accent rounded-full"></div>
                                <span><strong>İletişim:</strong> Duyurular, Mesajlar ve Anlık Sohbet</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-sakai-accent rounded-full"></div>
                                <span><strong>Analitik:</strong> İstatistik aracı ile öğrenci takibi ve loglama</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-sakai-accent rounded-full"></div>
                                <span><strong>Standartlar:</strong> SCORM ve H5P desteği</span>
                            </li>
                        </ul>
                     </div>
                </div>
            </div>
        </section>

        {/* Pros vs Cons */}
        <section id="proscons" className="py-24 bg-[#F0F4F8]">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-slate-900">Güçlü Yönler ve Sınırlılıklar</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Sakai, akademik odaklı yapısı ve özelleştirilebilirliği ile öne çıkarken, modern rakiplerine (Canvas) göre kullanıcı deneyimi ve bakım maliyetleri konusunda bazı zorluklar barındırır.
                    </p>
                </div>
                <div className="max-w-5xl mx-auto">
                    <StrengthsDiagram />
                </div>
            </div>
        </section>

         {/* Comparison Section (New) */}
         <section id="comparison" className="py-24 bg-white border-t border-slate-200">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                     <div className="inline-block mb-2 text-xs font-bold tracking-widest text-sakai-blue uppercase">REKABET ANALİZİ</div>
                     <h2 className="font-serif text-4xl text-slate-900 mb-4">Sakai vs Canvas</h2>
                     <p className="text-slate-500 max-w-2xl mx-auto">Akademik kontrol mü, modern sadelik mi? İki dev LMS'in karşılaştırması.</p>
                </div>
                <div className="flex justify-center">
                    <SakaiVsCanvas />
                </div>
            </div>
        </section>

        {/* Impact / Conclusion */}
        <section className="py-24 bg-slate-50 border-t border-slate-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-5 relative">
                    <div className="aspect-square bg-slate-900 rounded-xl overflow-hidden relative border border-slate-700 shadow-2xl group">
                        <NetworkScene />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 text-center backdrop-blur-[2px]">
                           <div className="text-sakai-accent font-bold text-sm mb-1 uppercase tracking-wider">Sakai Veri Ekosistemi</div>
                           <div className="text-xs text-slate-300 opacity-80">Merkezi Sunucu ve Uydu Modüller Arası Çift Yönlü Veri Transferi</div>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase">SONUÇ</div>
                    <h2 className="font-serif text-4xl mb-6 text-slate-900">Akademik Özgürlük</h2>
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                        Sakai, veriler ve altyapı üzerinde tam kontrol isteyen kurumlar için idealdir. "Lessons" aracı sayesinde yapılandırılmış öğrenme yolları oluşturmada rakiplerinden daha esnek olabilir.
                    </p>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        Ancak, kurulum ve bakım süreçlerinin zorluğu (Yüksek TCO) ve mobil uygulama deneyimindeki eksiklikler, bazı kurumların Canvas gibi SaaS çözümlerine yönelmesine neden olmaktadır.
                    </p>
                    
                    <div className="p-6 bg-white border border-slate-200 rounded-lg border-l-4 border-l-sakai-blue shadow-sm">
                        <p className="font-serif italic text-xl text-slate-800 mb-4">
                            "Apereo Vakfı ve topluluk desteği ile geliştirilen Sakai, ticarileşmiş LMS pazarına karşı açık kaynaklı ve akademik odaklı güçlü bir alternatif sunmaya devam ediyor."
                        </p>
                        <span className="text-sm font-bold text-slate-500 tracking-wider uppercase">— İnceleme Sonucu</span>
                    </div>
                </div>
             </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="py-16 bg-white border-t border-slate-200">
            <div className="container mx-auto px-6">
                <div className="text-center mb-10">
                     <div className="inline-block mb-2 text-xs font-bold tracking-widest text-sakai-blue uppercase">BİLGİ HAVUZU</div>
                     <h2 className="font-serif text-3xl text-slate-900">Kaynaklar ve Dokümantasyon</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <a href="https://www.apereo.org/programs/software/sakai-lms" target="_blank" rel="noopener noreferrer" className="p-6 bg-slate-50 rounded-lg shadow-sm border border-slate-100 hover:border-sakai-blue hover:shadow-md transition-all group block">
                        <BookOpen className="mb-4 text-slate-400 group-hover:text-sakai-blue" />
                        <h3 className="font-bold text-slate-800 mb-2">Resmî Dokümantasyon</h3>
                        <p className="text-sm text-slate-500">Apereo Vakfı ve Sakai Projesi'nin yönetici ve eğitmen rehberleri.</p>
                    </a>
                    <a href="https://sakai.screenstepslive.com/s/sakai_help" target="_blank" rel="noopener noreferrer" className="p-6 bg-slate-50 rounded-lg shadow-sm border border-slate-100 hover:border-sakai-blue hover:shadow-md transition-all group cursor-pointer block">
                        <MessageSquare className="mb-4 text-slate-400 group-hover:text-sakai-blue" />
                        <h3 className="font-bold text-slate-800 mb-2">Topluluk Forumları</h3>
                        <p className="text-sm text-slate-500">Google Groups ve Slack üzerinden teknik destek ve en iyi uygulamalar.</p>
                    </a>
                    <a href="https://www.youtube.com/@SakaiCLE" target="_blank" rel="noopener noreferrer" className="p-6 bg-slate-50 rounded-lg shadow-sm border border-slate-100 hover:border-sakai-blue hover:shadow-md transition-all group cursor-pointer block">
                        <Video className="mb-4 text-slate-400 group-hover:text-sakai-blue" />
                        <h3 className="font-bold text-slate-800 mb-2">Videolar & Öğreticiler</h3>
                        <p className="text-sm text-slate-500">YouTube ve ticari Sakai partnerlerinin eğitim videoları ve webinarları.</p>
                    </a>
                </div>
            </div>
        </section>

      </main>

      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2">Sercan UZUN</div>
                <p className="text-sm">UZE565 Öğrenme Süreçlerinin Tasarımı</p>
                <p className="text-xs mt-2 opacity-60">Sakai LMS İnceleme Sunumu • 2025</p>
            </div>
            
            <div className="flex gap-6 text-sm font-medium">
                <span>Kaynaklar: Apereo.org</span>
                <span>Sakaiproject.org</span>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
