import { AbsoluteFill, Audio, Img, staticFile } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Montserrat';
import { z } from 'zod';
import { zColor } from '@remotion/zod-types';

const { fontFamily } = loadFont('normal', {
  weights: ['400', '700', '800'],
  subsets: ['latin', 'vietnamese'],
});

export const introSchema = z.object({
  // === CONTENT ===
  title: z.string().describe('Main title text'),
  brandName: z.string().describe('Brand name'),
  tagline: z.string().describe('Tagline text'),
  url: z.string().describe('Website URL'),

  // === BACKGROUND ===
  backgroundImage: z.string().optional().describe('Background image path (optional)'),
  gradientTopColor: z.string().describe('Gradient overlay top color (hex or rgba)'),
  gradientBottomColor: z.string().describe('Gradient overlay bottom color (hex or rgba)'),
  gradientOpacity: z.number().min(0).max(1).step(0.05).describe('Gradient overlay opacity (use 1 if using rgba colors)'),
  showBackgroundPattern: z.boolean().describe('Show background pattern'),
  backgroundPatternOpacity: z.number().min(0).max(1).step(0.1).describe('Pattern opacity'),

  // === TOP LOGO (Corner) ===
  showTopLogo: z.boolean().describe('Show top logo'),
  topLogoX: z.number().min(-5000).max(5000).step(10).describe('Top logo X position'),
  topLogoY: z.number().min(-5000).max(5000).step(10).describe('Top logo Y position'),
  topLogoSize: z.number().min(40).max(200).step(10).describe('Top logo size'),

  // === BRAND SECTION ===
  showBrandLogo: z.boolean().describe('Show brand logo box'),
  brandSectionX: z.number().min(-5000).max(5000).step(10).describe('Brand section X position'),
  brandSectionY: z.number().min(-5000).max(5000).step(10).describe('Brand section Y position'),
  brandLogoSize: z.number().min(50).max(200).step(10).describe('Brand logo box size'),
  brandNameSize: z.number().min(20).max(120).step(2).describe('Brand name font size'),
  brandNameColor: zColor().describe('Brand name color'),
  accentColor: zColor().describe('Logo border color'),

  // === TAGLINE ===
  taglineX: z.number().min(-5000).max(5000).step(10).describe('Tagline X position'),
  taglineY: z.number().min(-5000).max(5000).step(10).describe('Tagline Y position'),
  taglineSize: z.number().min(12).max(60).step(2).describe('Tagline font size'),
  taglineColor: zColor().describe('Tagline color'),

  // === TITLE ===
  titleX: z.number().min(-5000).max(5000).step(10).describe('Title X position'),
  titleY: z.number().min(-5000).max(5000).step(10).describe('Title Y position'),
  titleSize: z.number().min(20).max(120).step(2).describe('Title font size'),
  titleColor: zColor().describe('Title color'),

  // === SOCIAL ICONS ===
  showSocialIcons: z.boolean().describe('Show social icons'),
  socialSectionX: z.number().min(-5000).max(5000).step(10).describe('Social section X position'),
  socialSectionY: z.number().min(-5000).max(5000).step(10).describe('Social section Y position'),
  socialIconSize: z.number().min(20).max(100).step(5).describe('Social icon size'),
  showFacebook: z.boolean().describe('Show Facebook'),
  showTikTok: z.boolean().describe('Show TikTok'),
  showYouTube: z.boolean().describe('Show YouTube'),
  showInstagram: z.boolean().describe('Show Instagram'),

  // === URL ===
  urlX: z.number().min(-5000).max(5000).step(10).describe('URL X offset (from social icons)'),
  urlSize: z.number().min(12).max(60).step(2).describe('URL font size'),
  urlColor: zColor().describe('URL color'),

  // === DECORATIVE ELEMENTS ===
  showMoneyElement: z.boolean().describe('Show money element'),
  moneyElementX: z.number().min(-5000).max(5000).step(10).describe('Money element X position'),
  moneyElementY: z.number().min(-5000).max(5000).step(10).describe('Money element Y position'),
  moneyElementSize: z.number().min(50).max(400).step(10).describe('Money element size'),
  moneyElementOpacity: z.number().min(0).max(1).step(0.1).describe('Money element opacity'),

  showProfitElement: z.boolean().describe('Show profit element'),
  profitElementX: z.number().min(-5000).max(5000).step(10).describe('Profit element X position'),
  profitElementY: z.number().min(-5000).max(5000).step(10).describe('Profit element Y position'),
  profitElementSize: z.number().min(50).max(800).step(10).describe('Profit element size'),
  profitElementOpacity: z.number().min(0).max(1).step(0.1).describe('Profit element opacity'),

  // === AUDIO ===
  enableAudio: z.boolean().describe('Enable background music'),
  audioVolume: z.number().min(0).max(1).step(0.05).describe('Music volume'),

  // === ANIMATION ===
  animationSpeed: z.number().min(0.5).max(2).step(0.1).describe('Animation speed'),
});

export type IntroProps = z.infer<typeof introSchema>;

export const Intro: React.FC<IntroProps> = (props) => {
  // No animations - all elements visible from the start
  const logoOpacity = 1;
  const brandOpacity = 1;
  const taglineOpacity = 1;
  const titleOpacity = 1;
  const urlOpacity = 1;
  const fadeOutOpacity = 1;

  const getSocialIconAnimation = () => {
    return { scale: 1, opacity: 1 };
  };

  const allSocialIcons = [
    { name: 'facebook', file: 'facebook.png', show: props.showFacebook },
    { name: 'tiktok', file: 'tiktok.png', show: props.showTikTok },
    { name: 'youtube', file: 'youtube.png', show: props.showYouTube },
    { name: 'instagram', file: 'instagram.png', show: props.showInstagram },
  ];

  const socialIcons = allSocialIcons.filter(icon => icon.show);

  return (
    <AbsoluteFill>
      {/* Background Music */}
      {props.enableAudio && (
        <Audio src={staticFile('intro_template/sound/background_music.mp3')} volume={() => props.audioVolume} />
      )}

      {/* Background Image (Photo) */}
      {props.backgroundImage && (
        <AbsoluteFill>
          <Img
            src={props.backgroundImage}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </AbsoluteFill>
      )}

      {/* Background Gradient Overlay */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${props.gradientTopColor} 0%, ${props.gradientBottomColor} 100%)`,
        }}
      />

      {/* Background Pattern */}
      {props.showBackgroundPattern && (
        <AbsoluteFill>
          <Img
            src={staticFile('intro_template/tiktok_background.png')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: props.backgroundPatternOpacity,
              mixBlendMode: 'overlay',
            }}
          />
        </AbsoluteFill>
      )}

      {/* Main Content Container */}
      <AbsoluteFill
        style={{
          opacity: fadeOutOpacity,
          overflow: 'visible',
        }}
      >
        {/* Top Logo Symbol */}
        {props.showTopLogo && (
          <div
            style={{
              position: 'absolute',
              left: `${props.topLogoX}px`,
              top: `${props.topLogoY}px`,
              width: `${props.topLogoSize}px`,
              height: `${props.topLogoSize}px`,
              opacity: logoOpacity,
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
          >
            <Img
              src={staticFile('intro_template/logo/logo_black.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        )}

        {/* Brand Logo with Text */}
        <div
          style={{
            position: 'absolute',
            left: `${props.brandSectionX}px`,
            top: `${props.brandSectionY}px`,
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            opacity: brandOpacity,
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        >
          {props.showBrandLogo && (
            <div
              style={{
                width: `${props.brandLogoSize}px`,
                height: `${props.brandLogoSize}px`,
                padding: '10px',
                border: `3px solid ${props.accentColor}`,
                borderRadius: '8px',
              }}
            >
              <Img
                src={staticFile('intro_template/logo/logo_white.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
          )}
          <div
            style={{
              fontFamily,
              fontSize: `${props.brandNameSize}px`,
              fontWeight: '700',
              color: props.brandNameColor,
              letterSpacing: '2px',
            }}
          >
            {props.brandName}
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            position: 'absolute',
            left: `${props.taglineX}px`,
            top: `${props.taglineY}px`,
            fontFamily,
            fontSize: `${props.taglineSize}px`,
            fontWeight: '400',
            color: props.taglineColor,
            opacity: taglineOpacity,
            willChange: 'transform',
            transform: 'translateZ(0)',
            letterSpacing: '1px',
          }}
        >
          {props.tagline}
        </div>

        {/* Title */}
        <div
          style={{
            position: 'absolute',
            left: `${props.titleX}px`,
            top: `${props.titleY}px`,
            fontFamily,
            fontSize: `${props.titleSize}px`,
            fontWeight: '800',
            color: props.titleColor,
            lineHeight: 1.2,
            opacity: titleOpacity,
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        >
          {props.title}
        </div>

        {/* Social Icons and URL */}
        <div
          style={{
            position: 'absolute',
            left: `${props.socialSectionX}px`,
            top: `${props.socialSectionY}px`,
            display: 'flex',
            alignItems: 'center',
            gap: '25px',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        >
          {/* Social Icons */}
          {props.showSocialIcons && socialIcons.map((icon) => {
            const { scale, opacity } = getSocialIconAnimation();
            return (
              <div
                key={icon.name}
                style={{
                  opacity,
                  transform: `scale(${scale})`,
                }}
              >
                <Img
                  src={staticFile(`intro_template/icons/${icon.file}`)}
                  style={{
                    width: `${props.socialIconSize}px`,
                    height: `${props.socialIconSize}px`,
                    objectFit: 'contain',
                  }}
                />
              </div>
            );
          })}

          {/* URL */}
          <div
            style={{
              fontFamily,
              fontSize: `${props.urlSize}px`,
              fontWeight: '400',
              color: props.urlColor,
              marginLeft: `${props.urlX}px`,
              opacity: urlOpacity,
            }}
          >
            {props.url}
          </div>
        </div>

        {/* Decorative Money Element */}
        {props.showMoneyElement && (
          <div
            style={{
              position: 'absolute',
              left: `${props.moneyElementX}px`,
              top: `${props.moneyElementY}px`,
              width: `${props.moneyElementSize}px`,
              height: `${props.moneyElementSize}px`,
              opacity: props.moneyElementOpacity,
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
          >
            <Img
              src={staticFile('intro_template/elements/money.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        )}

        {/* Decorative Profit Element */}
        {props.showProfitElement && (
          <div
            style={{
              position: 'absolute',
              left: `${props.profitElementX}px`,
              top: `${props.profitElementY}px`,
              width: `${props.profitElementSize}px`,
              height: `${props.profitElementSize}px`,
              opacity: props.profitElementOpacity,
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
          >
            <Img
              src={staticFile('intro_template/elements/Profit-PNG-Image.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
