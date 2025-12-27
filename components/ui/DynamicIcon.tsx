import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon,
  BookCopy, Rocket, PawPrint, Mic, ShoppingBasket, Palette, Calculator, Medal,
  Globe, Music, Languages, MessageSquareHeart, ThumbsUp, ThumbsDown, 
  HeartHandshake, GlassWater, Coffee, UtensilsCrossed, Sun, TreePine, 
  Mountain, Waves, CloudRain, Moon, Wind, PersonStanding, Utensils, 
  CupSoda, MoveRight, MoveLeft, Armchair, Gamepad2, BrainCircuit, 
  Bed, ShoppingCart, BookOpen, Pencil, Landmark, School, Hash, 
  User, Expand, Store, CircleDot, Users, 
  ChefHat, MoonStar, BedDouble, KeyRound
} from 'lucide-react';
import { ImageSource } from '../../types';
import { getAsset } from '../../data/assets';

const iconMap: Record<string, React.ElementType> = {
  BookCopy, Rocket, PawPrint, Mic, ShoppingBasket, Palette, Calculator, Medal,
  Globe, Music, Languages, MessageSquareHeart, ThumbsUp, ThumbsDown, 
  HeartHandshake, GlassWater, Coffee, UtensilsCrossed, Sun, TreePine, 
  Mountain, Waves, CloudRain, Moon, Wind, PersonStanding, Utensils, 
  CupSoda, MoveRight, MoveLeft, Armchair, Gamepad2, BrainCircuit, 
  Bed, ShoppingCart, BookOpen, Pencil, Landmark, School, Hash, 
  Image: ImageIcon, User, Expand, Store, CircleDot, Users, 
  ChefHat, MoonStar, BedDouble, KeyRound
};

interface DynamicIconProps {
  source: ImageSource;
  className?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ source, className = "w-16 h-16" }) => {
  const [loadError, setLoadError] = useState(false);
  const asset = source.imageId ? getAsset(source.imageId) : undefined;
  const initialUrl = source.iconUrl || asset?.url;
  
  useEffect(() => {
    setLoadError(false);
  }, [initialUrl]);

  if (initialUrl && !loadError) {
    return (
      <img 
        src={initialUrl} 
        alt={asset?.filename || "icon"} 
        className={`object-cover ${className}`}
        onError={() => setLoadError(true)}
        referrerPolicy="no-referrer"
      />
    );
  }

  if (source.iconName) {
    const IconComponent = iconMap[source.iconName];
    if (IconComponent) return <IconComponent className={className} />;
  }

  if (source.openMojiCode) {
    const mojiUrl = `https://cdn.jsdelivr.net/npm/openmoji@14.0.0/color/svg/${source.openMojiCode}.svg`;
    return (
      <img 
        src={mojiUrl} 
        alt="emoji" 
        className={`object-contain ${className}`}
        onError={() => setLoadError(true)}
        referrerPolicy="no-referrer"
      />
    );
  }
  
  if (source.emojiUnicode) {
    return <span className={`flex items-center justify-center text-4xl ${className}`}>{source.emojiUnicode}</span>;
  }

  return (
    <div className={`flex flex-col items-center justify-center bg-gray-100 rounded-xl border-2 border-dashed border-gray-200 ${className}`} title={source.imageId || 'Missing Icon'}>
      <ImageIcon className="w-1/2 h-1/2 text-gray-300" />
    </div>
  );
};

export default DynamicIcon;