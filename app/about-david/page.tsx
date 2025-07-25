'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../src/components/common/Header';
import Footer from '../../src/components/common/Footer';
import FloatingWhatsApp from '../../src/components/common/FloatingWhatsApp';
import Image from 'next/image';

const getLogoForSource = (source: string): string => {
  switch (source.toLowerCase()) {
    case 'ynet':
      return '/images/logos/ynet-logo.webp';
    case 'ישראל היום':
      return '/images/logos/israelhayom-logo.webp';
    case 'מעריב':
      return '/images/logos/sport1-logo.webp'; // Using sport1 logo for מעריב
    case 'ספורט 5':
      return '/images/logos/sport5-logo.webp';
    default:
      return '';
  }
};

const getLogoSize = (source: string): string => {
  // All containers have the same size (w-16 h-16) for consistent layout
  // Only the sport5-logo image stays smaller inside the container
  return 'w-16 h-16';
};

const getLogoImageSize = (source: string): string => {
  // sport5-logo image is smaller, others use full container size
  if (source.toLowerCase() === 'ספורט 5') {
    return 'w-12 h-12';
  }
  return 'w-full h-full';
};

const mediaLinks = [
  {
    title: "הרמת משקולות: ליטבינוב סיים עשירי באליפות אירופה",
    source: "ynet",
    url: "https://www.ynet.co.il/sport/article/H1SZU9gL00"
  },
  {
    title: "המסע של מרים המשקולות הישראלי בסעודיה",
    source: "ynet",
    url: "https://www.ynet.co.il/sport/article/s1pwbbp1t"
  },
  {
    title: "דוד ליטבינוב סגר את הופעתו בטוקיו עם ניקוד של 381 ק\"ג",
    source: "מעריב",
    url: "https://sport1.maariv.co.il/olympic-sports/%D7%98%D7%95%D7%A7%D7%99%D7%95-2020/article/721563/"
  },
  {
    title: "תוצאות מאליפות העולם 2023",
    source: "ישראל היום",
    url: "https://www.israelhayom.co.il/sport/other-sports/article/14617649"
  },
  {
    title: "סיכום אולימפיאדה - סיכום ההשתתפות באולימפיאדת טוקיו",
    source: "ספורט 5",
    url: "https://www.sport5.co.il/articles.aspx?FolderID=8662&docID=379152"
  }
];

export default function AboutDavid() {
  const router = useRouter();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary text-text-primary" dir="rtl">
        {/* Hero Section */}
        <section className="pt-24 pb-16 lg:pt-16 lg:pb-16">
          <div className="mx-auto px-4 text-center max-w-[1200px]">
            <h1 className="typo-page-title mb-6 text-content">
              הסיפור המלא של דוד ליטבינוב
            </h1>
          </div>
        </section>

        {/* Personal Journey Section */}
        <section className="pb-16 lg:pb-24">
          <div className="mx-auto px-4 max-w-4xl">
            {/* Main Hero Image */}
            <div className="mb-16">
              <div className="w-full transform hover:scale-105 transition-all duration-300">
                <Image
                  src="/images/aboutpage/david-lifting.webp"
                  alt="דוד ליטבינוב מרים משקולות"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg shadow-lg"
                  priority
                />
              </div>
            </div>

            {/* The Beginning - 2008 */}
            <div className="mb-16">
              <h2 className="typo-section-title mb-8 text-center text-content">
                ההתחלה
              </h2>
              <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
                <p className="typo-body-regular text-gray-300 leading-relaxed text-right">
                  ב־2008 הגעתי בפעם הראשונה לאולם הרמות משקולות. לא תכננתי, לא חלמתי – פשוט קרה. אבל מהר מאוד אחרי שהתחלתי להרים משקלים כבדים מעל הראש – התאהבתי. לא רק באימונים, אלא באיכות של התנועה, בתחושת השליטה, באתגר שלא הרגשתי בשום מקום אחר, באומנות שיש בזה.
                </p>
                <br />
                <p className="typo-body-regular text-gray-300 leading-relaxed text-right">
                  לא הייתי ילד כישרוני במיוחד. לא שברתי שיאים באימונים. אבל היה לי כיף, וזה היה מעניין. אז המשכתי. חקרתי. התמדתי. לאט־לאט התחלתי להתחרות. ופתאום – מייצג את המדינה באליפויות אירופה, טס מסביב לעולם. לא הייתי מהטובים –בהתחלה בכלל הייתי מדורג בסוף הרשימה. אבל הייתי שם. בתוך זה. עם הספורטאים הכי טובים בעולם.
                </p>
                <br />
                <p className="typo-body-regular text-gray-300 leading-relaxed text-right">
                  אחרי כמה שנים באו גם המדליות. פתאום זה נהיה הקריירה שלי. הפכתי לספורטאי תחרותי בווייטליפטינג - מרים משקולות מקצועי.
                </p>
              </div>
            </div>

            {/* Achievements Section */}
            <div className="mb-16">
              <h2 className="typo-section-title mb-8 text-center text-content">
                הישגים אישיים
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Snatch Record */}
                <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg">
                  <div className="text-4xl font-bold text-cta mb-2">188</div>
                  <div className="text-xl text-text-primary mb-2">ק"ג</div>
                  <div className="text-sm text-gray-400">סנאץ'</div>
                  <div className="text-sm text-green-400 mt-2">שיא ישראל</div>
                </div>
                
                {/* Clean & Jerk Record */}
                <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg">
                  <div className="text-4xl font-bold text-cta mb-2">220</div>
                  <div className="text-xl text-text-primary mb-2">ק"ג</div>
                  <div className="text-sm text-gray-400">קלין וג'רק</div>
                  <div className="text-sm text-green-400 mt-2">שיא ישראל</div>
                </div>
                
                {/* Olympic Participation */}
                <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg">
                  <div className="text-4xl font-bold text-cta mb-2">2020</div>
                  <div className="text-xl text-text-primary mb-2">טוקיו</div>
                  <div className="text-sm text-gray-400">אולימפיאדה</div>
                  <div className="text-sm text-green-400 mt-2">נציג ישראל</div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-cta rounded-full"></div>
                      <span className="typo-body-regular text-text-primary">
                        50+ שיאי ישראל רשמיים
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-cta rounded-full"></div>
                      <span className="typo-body-regular text-text-primary">
                        15+ נצחונות באליפויות ישראל
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-cta rounded-full"></div>
                      <span className="typo-body-regular text-text-primary">
                        מדליית ארד גביע העולם 2021
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-cta rounded-full"></div>
                      <span className="typo-body-regular text-text-primary">
                        נציג ישראל באולימפיאדת טוקיו 2020
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Teaching Journey - 2013 */}
            <div className="mb-16">
              <h2 className="typo-section-title mb-8 text-center text-content">
                המעבר להוראה
              </h2>
              
              {/* Teaching Image */}
              <div className="mb-8 flex justify-center">
                <div className="w-full max-w-2xl">
                  <Image
                    src="/images/aboutpage/david-teaching.webp"
                    alt="דוד מעביר סדנה"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
                <p className="typo-body-regular text-gray-300 leading-relaxed text-right">
                  ב־2013, התחלתי לאמן כשהקרוספיט רק התחיל להתפשט בארץ, פתאום ראיתי אנשים מהקהל הרחב מתעניינים בטכניקה. לא בשביל תחרות. לא בשביל מדליות. רק כי הם נהנים מהתנועה, מהאתגר. אבל לא הייתה להם גישה לזה – כי כל מי שרוצה ללמוד ווייטליפטינג בארץ (ולצערי גם ברוב העולם), חייב להתחרות.
                </p>
                <br />
                <p className="typo-body-regular text-gray-300 leading-relaxed text-right">
                  זה עצבן אותי. כי מבחינתי, אתה לא צריך להקדיש את החיים שלך לספורט כדי ליהנות ממנו.
                </p>
                <br />
                <p className="typo-body-regular text-gray-300 leading-relaxed text-right">
                  התחלתי להסביר לאנשים את העקרונות הכי מקצועיים – אבל בשפה פשוטה. גיליתי שאפשר ללמד גם "סודות של ספורטאים אולימפיים" –בצורה שכל אחד יבין. ופתאום מתאמנים התחילו להבין עקרונות שלכאורה היו שמורים רק לספורטאים מקצועיים. כשהם הבינו, הם הפסיקו לסבול מהתנועה, האימונים התחילו להיות כיפיים- ונפתח בפניי עולם שלם של אנשים שנהנים מוויטליפטינג, אז התחלתי ללמד אותו אחרת ממה שלימדו אותי. וההנאה מהאימון רק גרמה להם להתמיד יותר וההתמדה- רק יצרה יותר תוצאות.
                </p>
                <br />
                <p className="typo-body-regular text-gray-300 leading-relaxed text-right">
                  מאמנים טובים לא ידעו להסביר דברים פשוטים. כל אחד דיבר בשפה אחרת. כל אחד מלמד אחרת. אבל כולם ניסו להסביר את אותו דבר.
                </p>
                <br />
                <p className="typo-body-regular text-gray-300 leading-relaxed text-right">
                  אחרי שהתאמנתי והתחרתי ביותר מ־30 מדינות בעולם, הבנתי משהו: מי שמצליח זה מי שיודע לתקשר. לא מי שהכי חכם- אלא מי שמבינים אותו הכי טוב.
                </p>
              </div>
            </div>

            {/* Mission Today */}
            <div className="mb-16">
              <h2 className="typo-section-title mb-8 text-center text-content">
                המשימה שלי היום
              </h2>
              
              {/* Mission Image */}
              <div className="mb-8 flex justify-center">
                <div className="w-full max-w-2xl">
                  <Image
                    src="/images/aboutpage/david-pointing.webp"
                    alt="דוד מסביר ומדגם"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
                <p className="typo-body-regular text-gray-300 leading-relaxed text-right">
                  וזה בדיוק למה התחלתי להעביר הרצאות וסמינרים. אני לא מנסה להוכיח כלום. לא מסבך. לא מטיף. פשוט מקשיב למה שעוצר אותך – ונותן לך פתרון שאתה יכול ליישם - בצורה הכי פשוטה שיש.
                </p>
                <br />
                <p className="typo-body-regular text-gray-300 leading-relaxed text-right">
                  <strong className="text-cta">בשביל מה אני עושה את זה?</strong><br />
                  אני רוצה להנגיש את הספורט הזה – ווייטליפטינג – לכולם. להפסיק את הפחד מהמוט, ולהחזיר את ההנאה לתנועה. מבחינתי עולם הספורט המקצועי מפספס דבר אחד חשוב - לא צריך להיות ספורטאי מקצועי כדי להרגיש חזק, מדויק, ושלם עם עצמך באימון.
                </p>
                <br />
                <p className="typo-body-regular text-gray-300 leading-relaxed text-right">
                  <strong className="text-cta">יש לי מטרה אחת – לגרום למתאמנים להפסיק לסבול מוויטליפטינג ולהנגיש אותו לכמה שיותר אנשים.</strong>
                </p>
              </div>
            </div>

            {/* Media Coverage */}
            <div className="mb-16">
              <h2 className="typo-section-title mb-8 text-center text-content">
                סיקור תקשורתי
              </h2>
              <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
                <p className="typo-body-regular text-gray-400 mb-6 text-center">
                  על הקריירה שלי כספורטאי סיקרו במספר כלי תקשורת מובילים:
                </p>
                <div className="space-y-4">
                  {mediaLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-cta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <div className="flex-1">
                            <h3 className="typo-body-regular text-text-primary group-hover:text-cta transition-colors">
                              {link.title}
                            </h3>
                            <p className="text-sm text-gray-400">{link.source}</p>
                          </div>
                        </div>
                        {/* News outlet logo - positioned on the actual left in RTL */}
                        <div className={`flex-shrink-0 ${getLogoSize(link.source)} flex items-center justify-center mx-3`}>
                          <img 
                            src={getLogoForSource(link.source)}
                            alt={`${link.source} logo`}
                            className={`${getLogoImageSize(link.source)} object-contain`}
                          />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Wikipedia Section */}
            <div className="mb-16">
              <div className="bg-gray-800 rounded-lg p-8 shadow-lg text-center">
                <p className="typo-body-regular text-gray-300 mb-4">
                  מוזמנים לקרוא בדף הויקיפדיה שלי
                </p>
                <a
                  href="https://he.wikipedia.org/wiki/%D7%93%D7%95%D7%93_%D7%9C%D7%99%D7%98%D7%91%D7%99%D7%A0%D7%95%D7%91"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gray-700 hover:bg-gray-600 text-text-primary 
                            typo-body-regular px-6 py-3 rounded-lg transition-all duration-300 
                            transform hover:scale-105 group"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  <span className="group-hover:text-cta transition-colors">
                    ויקיפדיה - דוד ליטבינוב
                  </span>
                  <svg className="w-4 h-4 text-cta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center">
              <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
                <h2 className="typo-section-title mb-6 text-content">
                  מוכנים להתחיל?
                </h2>
                <p className="typo-body-regular text-gray-300 mb-8">
                  בואו נדבר על איך אני יכול לעזור לכם להפסיק לסבול מוויטליפטינג ולהתחיל ליהנות מהתנועה
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  {/* Primary CTA Button */}
                  <button 
                    onClick={() => router.push('/seminars')}
                    className="bg-cta hover:bg-yellow-600 text-bg-primary 
                                       typo-button-cta px-8 py-4 rounded-lg 
                                       transition-all duration-300 transform hover:scale-105
                                       w-full sm:w-auto">
                    לבחירת סדנה
                  </button>
                  
                  {/* Secondary WhatsApp Button */}
                  <button 
                    onClick={() => window.open('https://wa.link/mfzmps', '_blank')}
                    className="w-full sm:w-auto bg-transparent border-2 border-white 
                              text-white hover:bg-white 
                              hover:text-bg-primary typo-button-regular px-6 sm:px-8 
                              py-3 sm:py-4 rounded-lg transition-all duration-300 
                              flex items-center justify-center gap-3 transform hover:scale-105"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.4M12.043 21.785h-.004c-1.774 0-3.513-.477-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m5.413-7.402c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                    </svg>
                    צ'אט בוואטסאפ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}