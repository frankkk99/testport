"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ArrowRight, Download, Play, Mail, Info, 
  ExternalLink, Code, Layers, Video, Briefcase, Award, Plus, ChevronLeft, ChevronRight
} from 'lucide-react';

// --- DATA ---
const CATEGORIES = ["All", "Graphic Design", "Video Editing", "Content Strategy", "Event Operations", "Brand Strategy"];

const PROJECTS = [
  {
    id: 1,
    title: "Suranaree Army Night Run 2026",
    category: "Event Operations",
    role: "Key Visual & 3D Site Planning",
    desc: "ออกแบบสื่อประชาสัมพันธ์หลัก (Key Visual) สำหรับงานวิ่งการกุศลระดับจังหวัด และประยุกต์ใช้ SketchUp + Google Earth ในการวางผังพื้นที่จริง (3D Site Planning) เพื่อความแม่นยำในการติดตั้งโครงสร้างและบริหารกำลังพล",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fm=webp&fit=crop&q=80&w=600",
    tags: ["Illustrator", "SketchUp", "Event Management", "3D"],
    match: "98% Match",
    year: "2026"
  },
  {
    id: 2,
    title: "Nirin Fiber Pro Mix",
    category: "Brand Strategy",
    role: "Brand Strategy & Packaging",
    desc: "วางรากฐานแบรนด์ใหม่ทั้งหมด ตั้งแต่ออกแบบบรรจุภัณฑ์ (Packaging) ไปจนถึงวิเคราะห์โครงสร้างราคา ต้นทุนกำไร (Wholesale Price Table) สำหรับการแข่งขันในตลาดออนไลน์และระบบตัวแทนจำหน่าย",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fm=webp&fit=crop&q=80&w=600",
    tags: ["Branding", "Packaging", "Pricing Strategy"],
    match: "95% Match",
    year: "2026"
  },
  {
    id: 3,
    title: "SP x 3M Terminal 21",
    category: "Event Operations",
    role: "Booth Setup & Production",
    desc: "บริหารจัดการการออกบูธงานแสดงรถยนต์แบบครบวงจร ตั้งแต่การวางแผนเชิงกลยุทธ์ การออกแบบสื่อ Backdrop จัดเตรียมโครงสร้าง ไปจนถึงการควบคุมการติดตั้งหน้างานจริง",
    image: "https://images.unsplash.com/photo-1511406361295-0a1ff814c0ce?auto=format&fm=webp&fit=crop&q=80&w=600",
    tags: ["Production", "On-site", "Event", "Backdrop"],
    match: "92% Match",
    year: "2026"
  },
  {
    id: 4,
    title: "Khun Pim Personal Branding",
    category: "Content Strategy",
    role: "Video Editor & Scriptwriter",
    desc: "วางแผนเนื้อหารายสัปดาห์ (Weekly Content Plan) เขียนสคริปต์ และตัดต่อวิดีโอแบบมืออาชีพ เพื่อสร้าง Personal Branding ให้เจ้าของธุรกิจ สร้างความเชื่อมั่นและยอดขายที่ยั่งยืน",
    image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fm=webp&fit=crop&q=80&w=600",
    tags: ["Premiere Pro", "CapCut", "Scriptwriting"],
    match: "99% Match",
    year: "2026"
  },
  {
    id: 5,
    title: "Digital Content 300+ Pieces",
    category: "Graphic Design",
    role: "Social Media Designer",
    desc: "ผลิตสื่อกราฟิกโฆษณา คอนเทนต์ให้ความรู้ และโปรโมชั่น (เช่น งานฟิล์มรถยนต์ SP, CERAMATE, หมึกชะอำ) รวมกว่า 300+ ชิ้นต่อปี เพื่อสนับสนุนยอดขายในทุกแพลตฟอร์ม Social Media",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fm=webp&fit=crop&q=80&w=600",
    tags: ["Photoshop", "Social Media", "Ads", "Content"],
    match: "97% Match",
    year: "2025"
  },
  {
    id: 6,
    title: "Sports Marketing 80th Stadium",
    category: "Graphic Design",
    role: "OOH Media Designer",
    desc: "ออกแบบสื่อโฆษณาภายนอกอาคาร (OOH) และป้ายสปอนเซอร์ติดตั้งในสนามกีฬามาตรฐานสากล 80 พรรษา ออกแบบให้รองรับมุมกล้องการถ่ายทอดสดและสายตาผู้ชมทั่วประเทศ",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fm=webp&fit=crop&q=80&w=600",
    tags: ["Large Format", "Print", "OOH"],
    match: "94% Match",
    year: "2025"
  }
];

const CERTIFICATES = [
  { id: 1, title: "Generative AI & Prompt Engineering", issuer: "Chulalongkorn University", date: "May 2026" },
  { id: 2, title: "Foundation of Motion Graphic", issuer: "King Mongkut's Institute of Technology", date: "May 2026" },
  { id: 3, title: "การเล่าเรื่องด้วยภาพ (Storyboarding)", issuer: "Chiang Mai University", date: "May 2026" },
  { id: 4, title: "Communication for Business", issuer: "Chulalongkorn University", date: "May 2026" },
  { id: 5, title: "Photographic Technology", issuer: "Prince of Songkla University", date: "May 2026" },
  { id: 6, title: "Generative AI & ChatGPT", issuer: "Kasetsart University", date: "Sep 2025" },
  { id: 7, title: "Basic Prompt Engineering", issuer: "Mahidol University", date: "Sep 2025" },
  { id: 8, title: "Digital Marketing", issuer: "Prince of Songkla University", date: "Jun 2024" },
];

const SOFTWARE_SKILLS = [
  { name: "Adobe Photoshop", level: 95, type: "Graphic & Retouch" },
  { name: "Adobe Illustrator", level: 90, type: "Vector & Key Visual" },
  { name: "Adobe Premiere Pro", level: 85, type: "Professional Video Editing" },
  { name: "CapCut", level: 95, type: "Fast-paced Social Content" },
  { name: "SketchUp & 3D", level: 80, type: "Event Site Planning" },
  { name: "ChatGPT & AI Tools", level: 90, type: "AI Prompt Engineering" }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false); // สำหรับ Original Productions
  const [isCertHovered, setIsCertHovered] = useState(false); // สำหรับ Certificates
  
  const carouselRef = useRef(null);
  const certCarouselRef = useRef(null);

  // จัดการ Navbar Background เมื่อ Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); 
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll Hooks สำหรับ Parallax & Progress
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]); 
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);

  // เตรียมข้อมูลให้วนลูปได้แบบ Infinite
  const filteredProjects = useMemo(() => {
    return activeCategory === "All" 
      ? PROJECTS 
      : PROJECTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const infiniteProjects = useMemo(() => {
    return [...filteredProjects, ...filteredProjects];
  }, [filteredProjects]);

  const infiniteCertificates = useMemo(() => {
    return [...CERTIFICATES, ...CERTIFICATES];
  }, []);

  // ระบบ Auto-Scroll แบบไหลลื่นต่อเนื่อง (Original Productions)
  useEffect(() => {
    let animationFrameId;

    const continuousScroll = () => {
      if (carouselRef.current && !isCarouselHovered) {
        carouselRef.current.scrollLeft += 0.5; 
        
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
          carouselRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(continuousScroll);
    };

    animationFrameId = requestAnimationFrame(continuousScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isCarouselHovered, activeCategory]);

  // ระบบ Auto-Scroll แบบไหลลื่นต่อเนื่อง (Certificates)
  useEffect(() => {
    let certAnimationFrameId;

    const continuousCertScroll = () => {
      if (certCarouselRef.current && !isCertHovered) {
        certCarouselRef.current.scrollLeft += 0.4; // เลื่อนช้ากว่าโปรเจกต์นิดหน่อย
        
        if (certCarouselRef.current.scrollLeft >= certCarouselRef.current.scrollWidth / 2) {
          certCarouselRef.current.scrollLeft = 0;
        }
      }
      certAnimationFrameId = requestAnimationFrame(continuousCertScroll);
    };

    certAnimationFrameId = requestAnimationFrame(continuousCertScroll);
    return () => cancelAnimationFrame(certAnimationFrameId);
  }, [isCertHovered]);

  const handleCarouselScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8; 
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollEvent = () => {
    if (carouselRef.current) {
      setShowLeftArrow(carouselRef.current.scrollLeft > 10);
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-[#e5e5e5] font-sans selection:bg-[#E50914]/30 overflow-x-hidden">
      
      {/* CSS ซ่อน Scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
        body { background-color: #141414; overflow-x: hidden; }
      `}} />

      {/* SCROLL PROGRESS BAR (NETFLIX RED) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#E50914] origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* NAVBAR */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "bg-[#141414] shadow-lg" : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        <div className="w-full px-4 md:px-10 h-14 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="font-black text-2xl md:text-4xl tracking-tighter text-[#E50914]">
              FRANK<span className="text-sm md:text-xl align-top text-white">.</span>
            </div>
            
            <div className="hidden md:flex items-center gap-5 text-sm font-medium text-[#e5e5e5]">
              <a href="#home" className="hover:text-gray-300 transition-colors font-bold">Home</a>
              <a href="#work" className="hover:text-gray-300 transition-colors">Original Works</a>
              <a href="#showreel" className="hover:text-gray-300 transition-colors">Showreel</a>
              <a href="#expertise" className="hover:text-gray-300 transition-colors">Expertise</a>
              <a href="#skills" className="hover:text-gray-300 transition-colors">Skills</a>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-white hover:text-gray-300 transition-colors text-xs md:text-sm">
               <Download size={18} />
               <span className="font-medium">Resume</span>
            </button>
            <div className="w-7 h-7 md:w-8 md:h-8 rounded bg-gray-800 overflow-hidden cursor-pointer">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Frank&backgroundColor=E50914" alt="Profile" />
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative pt-24 pb-12 px-4 md:px-10 min-h-[70vh] md:min-h-[85vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1200" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent"></div>
        </div>
        
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="w-full relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-3"
          >
            <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 bg-[#E50914] text-white text-[10px] md:text-xs font-black rounded-sm">F</div>
            <span className="text-[#e5e5e5] text-xs md:text-sm font-bold tracking-widest uppercase">Original Portfolio</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-3 shadow-black drop-shadow-2xl uppercase"
          >
            Creative<br/>Strategist.
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-white font-semibold mb-4"
          >
            <span className="text-[#46d369]">99% Match</span>
            <span>2026</span>
            <span className="px-1.5 py-0.5 border border-gray-500 rounded text-[10px] md:text-xs bg-black/40">HD</span>
            <span className="text-gray-300 border border-gray-600 px-1.5 py-0.5 rounded text-[10px]">TH/EN</span>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="text-sm md:text-lg text-gray-300 mb-6 max-w-xl leading-relaxed drop-shadow-lg font-medium"
          >
            Graphic Designer, Video Editor และ Content Specialist <br className="hidden md:block"/>เน้นผลลัพธ์เชิงธุรกิจผ่านงานภาพและการเล่าเรื่อง
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex items-center gap-3"
          >
            <a href="#showreel" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-black px-4 py-2.5 rounded-sm font-bold text-sm md:text-base hover:bg-white/80 transition-colors">
              <Play size={18} fill="currentColor" /> Play
            </a>
            <a href="#work" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[rgba(109,109,110,0.7)] text-white px-4 py-2.5 rounded-sm font-bold text-sm md:text-base hover:bg-[rgba(109,109,110,0.4)] transition-colors">
              <Info size={18} /> Info
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* SELECTED WORKS (VERTICAL POSTER CAROUSEL) */}
      <section id="work" className="pt-6 pb-12 md:pb-16 px-0 relative z-20">
        <div className="mb-4 px-4 md:px-10">
          <h2 className="text-lg md:text-xl font-bold text-[#e5e5e5] mb-3">Original Productions</h2>
          
          {/* CATEGORY TABS (Mobile scrollable) */}
          <div className="flex overflow-x-auto no-scrollbar gap-4 pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs md:text-sm font-medium whitespace-nowrap transition-colors relative pb-1 ${
                  activeCategory === cat ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E50914]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* CAROUSEL ROW */}
        <div 
          className="relative group/row w-full"
          onMouseEnter={() => setIsCarouselHovered(true)}
          onMouseLeave={() => setIsCarouselHovered(false)}
          onTouchStart={() => setIsCarouselHovered(true)}
          onTouchEnd={() => setIsCarouselHovered(false)}
        >
          {/* Controls - ซ่อนบนมือถือ */}
          <button onClick={() => handleCarouselScroll('left')} className={`hidden md:flex absolute left-0 top-0 bottom-0 w-12 bg-black/50 hover:bg-black/80 text-white z-[60] items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 backdrop-blur-sm ${!showLeftArrow && 'pointer-events-none opacity-0 group-hover/row:opacity-0'}`}>
            <ChevronLeft size={40} className="scale-y-150" />
          </button>
          <button onClick={() => handleCarouselScroll('right')} className="hidden md:flex absolute right-0 top-0 bottom-0 w-12 bg-black/50 hover:bg-black/80 text-white z-[60] items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 backdrop-blur-sm">
            <ChevronRight size={40} className="scale-y-150" />
          </button>

          <div 
            ref={carouselRef}
            onScroll={handleScrollEvent}
            className="flex overflow-x-auto no-scrollbar px-4 md:px-10 pb-8"
            style={{ willChange: 'scroll-position' }}
          >
            <motion.div 
               key={activeCategory}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.4 }}
               className="flex gap-2.5 md:gap-4"
            >
              {infiniteProjects.map((project, index) => (
                <div
                  key={`${project.id}-${index}`} 
                  className="relative w-[130px] md:w-[200px] aspect-[2/3] flex-shrink-0 cursor-pointer rounded-md overflow-hidden group bg-[#181818]"
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* พื้นหลังไล่สีด้านล่างเพื่อให้ตัวหนังสือชัดขึ้น */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-2 md:p-3">
                    <div className="translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="text-[#46d369] font-bold text-[8px] md:text-[10px] mb-0.5 drop-shadow-md">
                        {project.match}
                      </div>
                      <h3 className="text-white font-bold text-xs md:text-sm drop-shadow-md leading-tight line-clamp-2">
                        {project.title}
                      </h3>
                      <div className="text-gray-400 text-[8px] md:text-[10px] mt-1 line-clamp-1 opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        {project.category}
                      </div>
                    </div>
                  </div>
                  
                  {/* เอฟเฟกต์โฮเวอร์เพิ่มเติมสำหรับเดสก์ท็อป */}
                  <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/20">
                     <div className="w-10 h-10 rounded-full border border-white/50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        <Play size={18} fill="white" className="ml-1" />
                     </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SHOWREEL & EXPERTISE */}
      <section id="showreel" className="py-10 md:py-16 px-4 md:px-10">
        <h2 className="text-lg md:text-xl font-bold text-[#e5e5e5] mb-4">Trending Now</h2>
        
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="relative w-full rounded-md overflow-hidden bg-black aspect-video shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-gray-800 group">
             <video 
                src="showreel.mp4" 
                autoPlay loop muted playsInline
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
             >
                <source src="showreel.mp4" type="video/mp4" />
             </video>
             
             <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-transparent to-transparent pointer-events-none"></div>
             
             <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 flex items-end gap-3 pointer-events-none">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-gray-400 bg-black/50 backdrop-blur-md flex items-center justify-center pointer-events-auto cursor-pointer">
                  <Play size={14} fill="white" className="ml-0.5 md:ml-1 md:w-[20px] md:h-[20px]" />
                </div>
                <div>
                  <h3 className="text-sm md:text-2xl font-black text-white tracking-wide uppercase shadow-black drop-shadow-xl">Showreel 2026</h3>
                  <p className="text-[10px] md:text-sm text-gray-300 font-medium">1 Season • Action & Strategy</p>
                </div>
             </div>
          </div>

          <div id="expertise" className="w-full">
            <h2 className="text-2xl md:text-4xl font-black text-white mb-3 md:mb-4 leading-tight">
              More than just visuals.<br/>I design for <span className="text-[#E50914]">impact</span>.
            </h2>
            <p className="text-gray-400 mb-6 text-sm md:text-base leading-relaxed">
              การทำงานของผมไม่ได้หยุดแค่ความสวยงาม แต่เน้นการสื่อสารที่ตรงจุด (Problem Solving) 
              ตั้งแต่การวางผัง 3D สำหรับ Event, การคิดคอนเทนต์เพื่อสร้าง Personal Branding, 
              ไปจนถึงการนำ AI มาช่วยเพิ่มประสิทธิภาพ
            </p>

            <div className="space-y-4 md:space-y-6">
              {[
                { icon: <Layers size={20} />, title: "End-to-End Execution", desc: "ดูแลตั้งแต่รับบรีฟ วางแผน ถ่ายทำ ไปจนถึงงานผลิตและติดตั้งจริง" },
                { icon: <Code size={20} />, title: "AI-Assisted Workflow", desc: "ประยุกต์ใช้ Prompt Engineering เพื่อเพิ่มความเร็วในการผลิตสื่อ" },
                { icon: <Briefcase size={20} />, title: "Business Oriented", desc: "เข้าใจโครงสร้างธุรกิจ การทำแบรนดิ้ง และการตลาดออนไลน์" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="text-gray-500 group-hover:text-white transition-colors mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm md:text-lg mb-1">{item.title}</h4>
                    <p className="text-xs md:text-sm text-gray-400 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOFTWARE SKILLS */}
      <section id="skills" className="py-10 md:py-16 px-4 md:px-10 bg-gradient-to-b from-[#141414] via-black/40 to-[#141414]">
        <h2 className="text-lg md:text-xl font-bold text-[#e5e5e5] mb-6 md:mb-8">
          Technical Arsenal <span className="text-gray-500 text-xs md:text-sm font-normal ml-2">| Software Proficiency</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 md:gap-y-8 max-w-5xl">
          {SOFTWARE_SKILLS.map((skill, index) => (
            <div key={index} className="group cursor-default">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h3 className="text-white font-bold text-sm md:text-base group-hover:text-white transition-colors">{skill.name}</h3>
                  <p className="text-[10px] md:text-xs text-gray-500">{skill.type}</p>
                </div>
                <span className="text-[#46d369] font-bold text-xs">{skill.level}% Match</span>
              </div>
              
              <div className="h-1 md:h-1.5 w-full bg-gray-800 rounded-full relative flex items-center group-hover:h-2 md:group-hover:h-2.5 transition-all duration-300">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                  className="h-full bg-[#E50914] rounded-full relative"
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-[#E50914] rounded-full shadow-[0_0_10px_rgba(229,9,20,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-1/2"></div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTINUOUS LEARNING (Certificates Auto-Scroll) */}
      <section id="certificates" className="py-10 md:py-16">
        <h2 className="text-lg md:text-xl font-bold text-[#e5e5e5] mb-4 px-4 md:px-10">My List (Certificates)</h2>
        
        {/* คอนเทนเนอร์ตรวจจับการ Hover/Touch เพื่อพักการเลื่อน */}
        <div 
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsCertHovered(true)}
          onMouseLeave={() => setIsCertHovered(false)}
          onTouchStart={() => setIsCertHovered(true)}
          onTouchEnd={() => setIsCertHovered(false)}
        >
          <div 
            id="cert-carousel"
            ref={certCarouselRef}
            className="flex overflow-x-auto no-scrollbar gap-3 pb-6 px-4 md:px-10"
            style={{ willChange: 'scroll-position' }}
          >
            {infiniteCertificates.map((cert, index) => (
              <div 
                key={`${cert.id}-${index}`} 
                className="relative w-[140px] md:w-[180px] aspect-[3/4] flex-shrink-0 rounded-md bg-[#181818] overflow-hidden cursor-pointer hover:ring-2 hover:ring-white transition-all group"
              >
                <div className="absolute inset-0 p-3 md:p-5 flex flex-col justify-between z-10 bg-gradient-to-b from-[#E50914]/20 to-[#141414]">
                  <div>
                    <Award size={24} className="text-gray-400 group-hover:text-white mb-2 transition-colors" />
                    <h3 className="text-xs md:text-sm font-bold text-white mb-1 leading-snug line-clamp-3">{cert.title}</h3>
                  </div>
                  <div>
                    <p className="text-[9px] md:text-xs text-gray-400 mb-1 line-clamp-1">{cert.issuer}</p>
                    <div className="text-[9px] md:text-[10px] font-bold text-[#46d369]">{cert.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-10 pt-12 pb-8 px-4 md:px-10 border-t border-gray-800 text-gray-500 text-center md:text-left">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl text-white font-bold mb-2">Ready to work together?</h3>
            <p className="text-xs md:text-sm mb-4 md:mb-0">Looking for a Graphic Designer, Video Editor, or Content Specialist?</p>
          </div>
          <a 
            href="mailto:hello@frankcreative.site" 
            className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-sm font-bold text-sm hover:bg-gray-200 transition-colors"
          >
            <Mail size={16} /> Contact Me
          </a>
        </div>

        <div className="grid grid-cols-3 md:flex gap-4 md:gap-6 text-[10px] md:text-xs font-medium mb-8 justify-center md:justify-start">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Portfolio</a>
          <a href="#" className="hover:underline">Resume</a>
          <a href="#" className="hover:underline">LinkedIn</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
        
        <div className="text-[10px] md:text-xs flex flex-col md:flex-row items-center justify-between gap-3">
          <p>FC. Portfolio © 2026 Chetsarit R.</p>
          <span className="px-2 py-1 border border-gray-600 rounded-sm">Service Code</span>
        </div>
      </footer>

    </div>
  );
}