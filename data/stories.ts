import { Story, Level, ChallengeType, PublishStatus, DifficultyHint } from '../types';

// Updated to HTTPS for consistency and browser compatibility
const AUDIO_BASE = 'https://www.bkamharic.com/storyplay/assets/audio';

export const stories: Story[] = [
  // STORY 1: ABEBE'S DOG
  {
    id: 'story-1-beginner',
    level: Level.Beginner4_6,
    title: 'የአበበ ውሻ', // Abebe's Dog
    targetWords: ['ውሻ', 'ስም', 'ውሃ', 'ትልቅ', 'ቡኒ', 'ደስተኛ'],
    coverImageId: 'cover-abebes-dog',
    icon: 'Dog',
    grammarFocus: 'Simple Sentences',
    publishStatus: PublishStatus.Published,
    estimatedTime: { [Level.Beginner4_6]: 5, [Level.Emerging7_9]: 4, [Level.FluentPrep10_12]: 3 },
    scenes: [
      {
        sceneId: 's1-sc1',
        order: 1,
        backgroundImageId: 'scene-abebes-dog-1',
        characters: ['abebe', 'jonny'],
        panels: [
          {
            panelId: 's1-p1',
            order: 1,
            illustrationId: 'ill-dog-s1-p1-abebe-with-dog',
            textVariants: {
              [Level.Beginner4_6]: 'አበበ ውሻ አለው።',
              [Level.Emerging7_9]: 'አበበ ቆንጆ ውሻ አለው።',
              [Level.FluentPrep10_12]: 'አበበ ድንቅ የሆነ ውሻ ባለቤት ነው።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "Abebe has a dog.",
              [Level.Emerging7_9]: "Abebe has a lovely dog.",
              [Level.FluentPrep10_12]: "Abebe is the proud owner of a wonderful dog.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s1_p1_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s1_p1_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s1_p1_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's1-p2',
            order: 2,
            illustrationId: 'ill-dog-s1-p2-jonny-name-tag',
            textVariants: {
              [Level.Beginner4_6]: 'የውሻው ስም ጆኒ ነው።',
              [Level.Emerging7_9]: 'ስሙ ጆኒ ነው።',
              [Level.FluentPrep10_12]: 'ይህ ታማኝ ጓደኛ ጆኒ ይባላል።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "The dog's name is Jonny.",
              [Level.Emerging7_9]: "His name is Jonny.",
              [Level.FluentPrep10_12]: "This faithful companion is named Jonny.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s1_p2_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s1_p2_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s1_p2_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's1-p3',
            order: 3,
            illustrationId: 'ill-dog-s1-p3-jonny-is-big',
            textVariants: {
              [Level.Beginner4_6]: 'ጆኒ ትልቅ ነው።',
              [Level.Emerging7_9]: 'ጆኒ ትልቅ ውሻ ነው።',
              [Level.FluentPrep10_12]: 'ጆኒ ለእድሜው በጣም ትልቅ ውሻ ነው።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "Jonny is big.",
              [Level.Emerging7_9]: "Jonny is a big dog.",
              [Level.FluentPrep10_12]: "Jonny is quite large for a dog his age.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s1_p3_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s1_p3_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s1_p3_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's1-p4',
            order: 4,
            illustrationId: 'ill-dog-s1-p4-jonny-is-brown',
            textVariants: {
              [Level.Beginner4_6]: 'ጆኒ ቡኒ ነው።',
              [Level.Emerging7_9]: 'እሱ ቡኒ ጸጉር አለው።',
              [Level.FluentPrep10_12]: 'ሱፍ የለበሰው ቆንጆ ቡኒ ቀለም አለው።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "Jonny is brown.",
              [Level.Emerging7_9]: "He has brown fur.",
              [Level.FluentPrep10_12]: "His coat is a beautiful shade of brown.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s1_p4_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s1_p4_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s1_p4_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's1-p5',
            order: 5,
            illustrationId: 'ill-dog-s1-p5-jonny-runs',
            textVariants: {
              [Level.Beginner4_6]: 'ጆኒ ይሮጣል።',
              [Level.Emerging7_9]: 'ጆኒ መሮጥ ይወዳል።',
              [Level.FluentPrep10_12]: 'ጆኒ በሜዳው ላይ በነፃነት መሮጥ ይወዳል።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "Jonny runs.",
              [Level.Emerging7_9]: "Jonny loves to run.",
              [Level.FluentPrep10_12]: "Jonny loves to run freely in the open field.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s1_p5_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s1_p5_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s1_p5_fluentprep10_12.mp3`,
            },
            challengeType: ChallengeType.ListenRepeat,
            recordSlotId: 's1-p5-record',
          },
          {
            panelId: 's1-p6',
            order: 6,
            illustrationId: 'ill-dog-s1-p6-jonny-plays',
            textVariants: {
              [Level.Beginner4_6]: 'ጆኒ ይጫወታል።',
              [Level.Emerging7_9]: 'ጆኒ ቀኑን ሙሉ ይጫወታል።',
              [Level.FluentPrep10_12]: 'ጆኒ ከሰአት በኋላ ከሚወዳቸው አሻንጉሊቶች ጋር በመጫወት ያሳልፋል።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "Jonny plays.",
              [Level.Emerging7_9]: "Jonny plays all day.",
              [Level.FluentPrep10_12]: "Jonny spends his afternoons playing with his favorite toys.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s1_p6_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s1_p6_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s1_p6_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's1-p7',
            order: 7,
            illustrationId: 'ill-dog-s1-p7-jonny-eats',
            textVariants: {
              [Level.Beginner4_6]: 'ጆኒ ይበላል።',
              [Level.Emerging7_9]: 'ጆኒ ምግቡን ይበላል።',
              [Level.FluentPrep10_12]: 'ሲርበው ጆኒ ጣፋጭ ምግቡን ይበላል።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "Jonny eats.",
              [Level.Emerging7_9]: "Jonny eats his food.",
              [Level.FluentPrep10_12]: "When he gets hungry, Jonny eats his delicious food.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s1_p7_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s1_p7_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s1_p7_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's1-p8',
            order: 8,
            illustrationId: 'ill-dog-s1-p8-jonny-drinks',
            textVariants: {
              [Level.Beginner4_6]: 'ጆኒ ውሃ ይጠጣል።',
              [Level.Emerging7_9]: 'ጆኒ ንጹህ ውሃ ይጠጣል።',
              [Level.FluentPrep10_12]: 'ከተጫወተ በኋላ ጆኒ ጥሙን ለማርካት ቀዝቃዛና ንጹህ ውሃ ይጠጣል።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "Jonny drinks water.",
              [Level.Emerging7_9]: "Jonny drinks clean water.",
              [Level.FluentPrep10_12]: "After playing, Jonny drinks cool, fresh water to quench his thirst.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s1_p8_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s1_p8_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s1_p8_fluentprep10_12.mp3`,
            },
            challengeType: ChallengeType.ListenRepeat,
            recordSlotId: 's1-p8-record',
          },
          {
            panelId: 's1-p9',
            order: 9,
            illustrationId: 'ill-dog-s1-p9-abebe-hugs-jonny',
            textVariants: {
              [Level.Beginner4_6]: 'አበበ ጆኒን ይወደዋል።',
              [Level.Emerging7_9]: 'አበበ ውሻውን ጆኒን ይወደዋል።',
              [Level.FluentPrep10_12]: 'አበበ ታማኝ ጓደኛውን ጆኒን በጣም ይወደዋል።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "Abebe loves Jonny.",
              [Level.Emerging7_9]: "Abebe loves his dog Jonny.",
              [Level.FluentPrep10_12]: "Abebe deeply loves his loyal friend, Jonny.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s1_p9_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s1_p9_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s1_p9_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's1-p10',
            order: 10,
            illustrationId: 'ill-dog-s1-p10-jonny-happy',
            textVariants: {
              [Level.Beginner4_6]: 'ጆኒ ደስተኛ ውሻ ነው።',
              [Level.Emerging7_9]: 'ጆኒ በጣም ደስተኛ ውሻ ነው።',
              [Level.FluentPrep10_12]: 'በጣም ስለሚወደድ ጆኒ በጣም ደስተኛ ውሻ ነው።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "Jonny is a happy dog.",
              [Level.Emerging7_9]: "Jonny is a very happy dog.",
              [Level.FluentPrep10_12]: "Because he is so loved, Jonny is a very happy dog.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s1_p10_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s1_p10_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s1_p10_fluentprep10_12.mp3`,
            }
          },
        ],
      },
    ],
  },
  // STORY 2: ALMAZ MARKET
  {
    id: 'story-2-emerging',
    level: Level.Emerging7_9,
    title: 'አልማዝ ወደ ገበያ ሄደች', // Almaz Went to the Market
    targetWords: ['ገበያ', 'ቀን', 'ቅርጫት', 'ሙዝ', 'ቲማቲም', 'ቢጫ', 'ቀይ', 'ደስተኛ'],
    coverImageId: 'cover-almaz-market',
    icon: 'ShoppingBasket',
    grammarFocus: 'Nouns and Adjectives',
    publishStatus: PublishStatus.Published,
    estimatedTime: { [Level.Beginner4_6]: 5, [Level.Emerging7_9]: 4, [Level.FluentPrep10_12]: 3 },
    scenes: [
      {
        sceneId: 's2-sc1',
        order: 1,
        backgroundImageId: 'scene-almaz-market-1',
        characters: ['almaz'],
        panels: [
          {
            panelId: 's2-p1',
            order: 1,
            illustrationId: 'ill-market-s2-p1-intro-almaz',
            textVariants: {
              [Level.Beginner4_6]: 'ይህች አልማዝ ናት።',
              [Level.Emerging7_9]: 'ይህች ልጅ አልማዝ ትባላለች።',
              [Level.FluentPrep10_12]: 'ከጓደኛችን አልማዝ ጋር ተዋወቁ።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "This is Almaz.",
              [Level.Emerging7_9]: "This girl is called Almaz.",
              [Level.FluentPrep10_12]: "Meet our friend, Almaz.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s2_p1_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s2_p1_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s2_p1_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's2-p2',
            order: 2,
            illustrationId: 'ill-market-s2-p2-market-scene',
            textVariants: {
              [Level.Beginner4_6]: 'ዛሬ የገበያ ቀን ነው።',
              [Level.Emerging7_9]: 'ዛሬ ወደ ገበያ የምትሄድበት ቀን ነው።',
              [Level.FluentPrep10_12]: 'ዛሬ ፀሐያማ ቀን ነው፣ እና ለገበያ በጣም ጥሩ ቀን ነው።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "Today is market day.",
              [Level.Emerging7_9]: "Today is the day she goes to the market.",
              [Level.FluentPrep10_12]: "It's a sunny day today, and it's a perfect day for the market.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s2_p2_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s2_p2_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s2_p2_fluentprep10_12.mp3`,
            }
          },
           {
            panelId: 's2-p3',
            order: 3,
            illustrationId: 'ill-market-s2-p3-almaz-walks-to-market',
            textVariants: {
              [Level.Beginner4_6]: 'አልማዝ ወደ ገበያ ትሄዳለች።',
              [Level.Emerging7_9]: 'አልማዝ ወደ ገበያ ለመሄድ ከቤት ወጣች።',
              [Level.FluentPrep10_12]: 'በደስታ ስሜት አልማዝ ወደ ሕያው እና የተጨናነቀው ገበያ አመራች።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "Almaz goes to the market.",
              [Level.Emerging7_9]: "Almaz left home to go to the market.",
              [Level.FluentPrep10_12]: "With excitement, Almaz heads towards the lively and bustling market.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s2_p3_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s2_p3_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s2_p3_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's2-p4',
            order: 4,
            illustrationId: 'ill-market-s2-p4-almaz-holds-basket',
            textVariants: {
              [Level.Beginner4_6]: 'አልማዝ ቅርጫት አላት።',
              [Level.Emerging7_9]: 'አልማዝ የምትገዛቸውን ነገሮች የምታስቀምጥበት ቅርጫት ይዛለች።',
              [Level.FluentPrep10_12]: 'አልማዝ በገበያ የምትሰበስባቸውን ጣፋጭ ምግቦች ለመያዝ ባዶ ቅርጫት ይዛለች።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "Almaz has a basket.",
              [Level.Emerging7_9]: "Almaz is carrying a basket to put the things she buys.",
              [Level.FluentPrep10_12]: "Almaz carries an empty basket to hold all the delicious treats she will collect at the market.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s2_p4_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s2_p4_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s2_p4_fluentprep10_12.mp3`,
            }
          },
           {
            panelId: 's2-p5',
            order: 5,
            illustrationId: 'ill-market-s2-p5-almaz-buys-banana',
            textVariants: {
              [Level.Beginner4_6]: 'አልማዝ ሙዝ ትገዛለች።',
              [Level.Emerging7_9]: 'በመጀመሪያ፣ አልማዝ ጣፋጭ ሙዝ ገዛች።',
              [Level.FluentPrep10_12]: 'በመጀመሪያው የፍራፍሬ መሸጫ ቦታ ላይ ቆማ፣ አልማዝ ለመክሰስ የሚሆን አንድ ሙዝ መረጠች።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "Almaz buys a banana.",
              [Level.Emerging7_9]: "First, Almaz bought a sweet banana.",
              [Level.FluentPrep10_12]: "Stopping at the first fruit stall, Almaz chooses a banana for a snack.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s2_p5_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s2_p5_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s2_p5_fluentprep10_12.mp3`,
            },
             challengeType: ChallengeType.ListenRepeat,
            recordSlotId: 's2-p5-record',
          },
          {
            panelId: 's2-p6',
            order: 6,
            illustrationId: 'ill-market-s2-p6-yellow-banana',
            textVariants: {
              [Level.Beginner4_6]: 'ሙዙ ቢጫ ነው።',
              [Level.Emerging7_9]: 'ሙዙ ደማቅ __blank__ ቀለም አለው።',
              [Level.FluentPrep10_12]: 'እሷ የመረጠችው ሙዝ እንደ ፀሐይ የበሰለ እና ቢጫ ነው።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "The banana is yellow.",
              [Level.Emerging7_9]: "The banana has a bright __blank__ color.",
              [Level.FluentPrep10_12]: "The banana she chose is perfectly ripe and yellow like the sun.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s2_p6_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s2_p6_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s2_p6_fluentprep10_12.mp3`,
            },
            challengeType: ChallengeType.FillBlank,
            challengeAnswer: 'ቢጫ',
          },
          {
            panelId: 's2-p7',
            order: 7,
            illustrationId: 'ill-market-s2-p7-almaz-buys-tomato',
            textVariants: {
              [Level.Beginner4_6]: 'አልማዝ ቲማቲም ትገዛለች።',
              [Level.Emerging7_9]: 'በመቀጠል፣ አልማዝ ቀይ ቲማቲም ትገዛለች።',
              [Level.FluentPrep10_12]: 'ከዚያም ወደ አትክልት መሸጫው በመሄድ፣ አልማዝ ለእናቷ ወጥ የሚሆን ትልቅና ቀይ ቲማቲም ገዛች።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "Almaz buys a tomato.",
              [Level.Emerging7_9]: "Next, Almaz buys a red tomato.",
              [Level.FluentPrep10_12]: "Then, moving to the vegetable vendor, Almaz buys a big, red tomato for her mother's stew.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s2_p7_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s2_p7_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s2_p7_fluentprep10_12.mp3`,
            }
          },
           {
            panelId: 's2-p8',
            order: 8,
            illustrationId: 'ill-market-s2-p8-red-tomato',
            textVariants: {
              [Level.Beginner4_6]: 'ቲማቲሙ ቀይ ነው።',
              [Level.Emerging7_9]: 'ቲማቲሙ የሚያምር ቀይ ቀለም አለው።',
              [Level.FluentPrep10_12]: 'ቲማቲሙ በጣም ቀይ እና የበሰለ ከመሆኑ የተነሳ በእጇ ሲይዘው ያበራል።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "The tomato is red.",
              [Level.Emerging7_9]: "The tomato has a beautiful red color.",
              [Level.FluentPrep10_12]: "The tomato is so red and ripe that it shines in her hand.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s2_p8_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s2_p8_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s2_p8_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's2-p9',
            order: 9,
            illustrationId: 'ill-market-s2-p9-full-basket',
            textVariants: {
              [Level.Beginner4_6]: 'ቅርጫቱ ሞልቷል።',
              [Level.Emerging7_9]: 'አሁን የአልማዝ ቅርጫት በፍራፍሬ እና አትክልት ሞልቷል።',
              [Level.FluentPrep10_12]: 'በቢጫ ሙዝ እና በቀይ ቲማቲም፣ የአልማዝ ቅርጫት አሁን በደማቅ ቀለማት እና ጣፋጭ ምግቦች ተሞልቷል።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "The basket is full.",
              [Level.Emerging7_9]: "Now Almaz's basket is full of fruits and vegetables.",
              [Level.FluentPrep10_12]: "With the yellow banana and red tomato, Almaz's basket is now filled with bright colors and tasty food.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s2_p9_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s2_p9_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s2_p9_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's2-p10',
            order: 10,
            illustrationId: 'ill-market-s2-p10-almaz-is-happy',
            textVariants: {
              [Level.Beginner4_6]: 'አልማዝ ደስተኛ ናት።',
              [Level.Emerging7_9]: 'አልማዝ በገዛቻቸው ነገሮች በጣም ደስተኛ ናት።',
              [Level.FluentPrep10_12]: 'በቀኗ ስኬት ረክታ፣ አልማዝ በፈገግታ ወደ ቤቷ ተመለሰች።',
            },
            textEnglishVariants: {
              [Level.Beginner4_6]: "Almaz is happy.",
              [Level.Emerging7_9]: "Almaz is very happy with her purchases.",
              [Level.FluentPrep10_12]: "Satisfied with her successful day, Almaz returns home with a smile.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s2_p10_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s2_p10_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s2_p10_fluentprep10_12.mp3`,
            }
          },
        ],
      },
    ],
  },
  // STORY 3: SCHOOL DAY
  {
    id: 'story-3-beginner',
    level: Level.Beginner4_6,
    title: 'የኔ ትምህርት ቤት ቀን', // My School Day
    targetWords: ['ትምህርት ቤት', 'መምህር', 'ወንበር', 'መጽሐፍ', 'እርሳስ', 'ቁጥር', 'ሥዕል', 'አበባ', 'ቀይ'],
    coverImageId: 'cover-school-day',
    icon: 'School',
    grammarFocus: 'Classroom Vocabulary',
    publishStatus: PublishStatus.Published,
    estimatedTime: { [Level.Beginner4_6]: 5, [Level.Emerging7_9]: 4, [Level.FluentPrep10_12]: 3 },
    scenes: [
      {
        sceneId: 's3-sc1',
        order: 1,
        backgroundImageId: 'scene-school-day-1',
        characters: ['lia'],
        panels: [
          {
            panelId: 's3-p1',
            order: 1,
            illustrationId: 'ill-school-s3-p1-lia-goes-to-school',
            textVariants: {
              [Level.Beginner4_6]: 'ሊያ ወደ ትምህርት ቤት ትሄዳለች።',
              [Level.Emerging7_9]: 'ሊያ ዛሬ ወደ ትምህርት ቤት በመሄዷ ተደስታለች።',
              [Level.FluentPrep10_12]: 'በየቀኑ ጠዋት፣ ሊያ አዲስ ነገር ለመማር በጉጉት ወደ ትምህርት ቤት ትሄዳለች።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "Lia goes to school.",
                [Level.Emerging7_9]: "Lia is excited to go to school today.",
                [Level.FluentPrep10_12]: 'Every morning, Lia eagerly goes to school to learn new things.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s3_p1_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s3_p1_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s3_p1_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's3-p2',
            order: 2,
            illustrationId: 'ill-school-s3-p2-lia-greets-teacher',
            textVariants: {
              [Level.Beginner4_6]: 'ሰላም ትላለች።',
              [Level.Emerging7_9]: ' ለመምህሯ ሰላም ትላለች።',
              [Level.FluentPrep10_12]: 'ክፍል ስትገባ፣ ሊያ ለመምህሯ "እንደምን አደሩ" በማለት ሰላምታ ትሰጣለች።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "She says hello.",
                [Level.Emerging7_9]: "She says hello to her teacher.",
                [Level.FluentPrep10_12]: 'When she enters the classroom, Lia greets her teacher with a cheerful "Good morning".',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s3_p2_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s3_p2_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s3_p2_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's3-p3',
            order: 3,
            illustrationId: 'ill-school-s3-p3-lia-sits-down',
            textVariants: {
              [Level.Beginner4_6]: 'ሊያ ተቀመጠች።',
              [Level.Emerging7_9]: 'ሊያ በወንበሯ ላይ ተቀመጠች።',
              [Level.FluentPrep10_12]: 'መምህሯን ካነጋገረች በኋላ፣ ሊያ ወደ መቀመጫዋ ሄዳ ወንበሯ ላይ ተቀመጠች።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "Lia sat down.",
                [Level.Emerging7_9]: "Lia sat on her chair.",
                [Level.FluentPrep10_12]: 'After talking to her teacher, Lia went to her seat and sat down on her chair.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s3_p3_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s3_p3_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s3_p3_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's3-p4',
            order: 4,
            illustrationId: 'ill-school-s3-p4-lia-with-book',
            textVariants: {
              [Level.Beginner4_6]: 'መጽሐፍ አላት።',
              [Level.Emerging7_9]: 'ሊያ መጽሐፏን እና እርሳሷን አወጣች።',
              [Level.FluentPrep10_12]: 'ትምህርቱን ለመከታተል ዝግጁ ስትሆን፣ ሊያ መጽሐፏን እና እርሳሷን ከቦርሳዋ አወጣች።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "She has a book.",
                [Level.Emerging7_9]: "Lia took out her book and pencil.",
                [Level.FluentPrep10_12]: 'Ready for the lesson, Lia took her book and pencil out of her bag.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s3_p4_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s3_p4_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s3_p4_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's3-p5',
            order: 5,
            illustrationId: 'ill-school-s3-p5-lia-learns-numbers',
            textVariants: {
              [Level.Beginner4_6]: 'ቁጥር ትማራለች።',
              [Level.Emerging7_9]: 'ቁጥሮችን መጻፍ ትማራለች።',
              [Level.FluentPrep10_12]: 'የዛሬው ትምህርት ስለ ቁጥሮች ነው፤ ሊያ አንድ፣ ሁለት፣ እና ሦስት መጻፍ ትለማመዳለች።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "She learns numbers.",
                [Level.Emerging7_9]: "She learns to write numbers.",
                [Level.FluentPrep10_12]: "Today's lesson is about numbers; Lia practices writing one, two, and three.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s3_p5_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s3_p5_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s3_p5_fluentprep10_12.mp3`,
            },
            challengeType: ChallengeType.ListenRepeat,
            recordSlotId: 's3-p5-record',
          },
          {
            panelId: 's3-p6',
            order: 6,
            illustrationId: 'ill-school-s3-p6-lia-draws-picture',
            textVariants: {
              [Level.Beginner4_6]: 'ሥዕል ትሥላለች።',
              [Level.Emerging7_9]: 'ሊያ የሚያምር ሥዕል ትሥላለች።',
              [Level.FluentPrep10_12]: 'ከቁጥሮች በኋላ፣ የስዕል ጊዜ ነው! ሊያ አንድ ትልቅ እና የሚያምር አበባ መሥራት ጀመረች።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "She draws a picture.",
                [Level.Emerging7_9]: "Lia draws a beautiful picture.",
                [Level.FluentPrep10_12]: 'After numbers, it is drawing time! Lia starts to create a big, beautiful flower.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s3_p6_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s3_p6_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s3_p6_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's3-p7',
            order: 7,
            illustrationId: 'ill-school-s3-p7-red-flower',
            textVariants: {
              [Level.Beginner4_6]: 'አበባው __blank__ ነው።',
              [Level.Emerging7_9]: 'አበባው ደማቅ __blank__ ቀለም አለው።',
              [Level.FluentPrep10_12]: 'ለአበባዋ የምትወደውን ቀለም መረጠች፤ የሚያምር እና ደማቅ ቀይ።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "The flower is __blank__.",
                [Level.Emerging7_9]: "The flower has a bright __blank__ color.",
                [Level.FluentPrep10_12]: 'She chose her favorite color for her flower; a lovely, bright red.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s3_p7_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s3_p7_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s3_p7_fluentprep10_12.mp3`,
            },
            challengeType: ChallengeType.FillBlank,
            challengeAnswer: 'ቀይ',
          },
          {
            panelId: 's3-p8',
            order: 8,
            illustrationId: 'ill-school-s3-p8-lia-likes-school',
            textVariants: {
              [Level.Beginner4_6]: 'ትምህርት ቤት ጥሩ ነው።',
              [Level.Emerging7_9]: 'ሊያ ትምህርት ቤት መሄድ ትወዳለች።',
              [Level.FluentPrep10_12]: 'ሊያ መማር እና መጫወት ስለምትችል ትምህርት ቤቷን በጣም ትወዳለች።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "School is good.",
                [Level.Emerging7_9]: "Lia loves going to school.",
                [Level.FluentPrep10_12]: "Lia loves her school because she can learn and play.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s3_p8_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s3_p8_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s3_p8_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's3-p9',
            order: 9,
            illustrationId: 'ill-school-s3-p9-school-is-finished',
            textVariants: {
              [Level.Beginner4_6]: 'ትምህርት አለቀ።',
              [Level.Emerging7_9]: 'የዛሬው ትምህርት አልቋል።',
              [Level.FluentPrep10_12]: 'ደወሉ ጮኸ፣ ይህም የትምህርት ቀኑ ማለቁን ያመለክታል።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "School is finished.",
                [Level.Emerging7_9]: "The school day is over.",
                [Level.FluentPrep10_12]: "The bell rings, signaling that the school day is over.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s3_p9_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s3_p9_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s3_p9_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's3-p10',
            order: 10,
            illustrationId: 'ill-school-s3-p10-lia-waves-goodbye',
            textVariants: {
              [Level.Beginner4_6]: 'ደህና ሁን።',
              [Level.Emerging7_9]: 'ሊያ ለሁሉም ደህና ሁኑ አለች።',
              [Level.FluentPrep10_12]: 'ሊያ ቦርሳዋን ይዛ ጓደኞቿን እና መምህሯን ተሰናብታ ወደ ቤቷ ሄደች።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "Goodbye.",
                [Level.Emerging7_9]: "Lia says goodbye to everyone.",
                [Level.FluentPrep10_12]: 'Lia packs her bag, waves goodbye to her friends and teacher, and heads home.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s3_p10_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s3_p10_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s3_p10_beginner4_6.mp3`,
            }
          },
        ],
      },
    ],
  },
  // STORY 4: PLAYING TOGETHER
  {
    id: 'story-4-emerging',
    level: Level.Emerging7_9,
    title: 'በጋራ መጫወት', // Playing Together
    targetWords: ['ኳስ', 'ትልቅ', 'ቀይ', 'መጫወት', 'አዎ', 'በጋራ', 'ደስተኛ'],
    coverImageId: 'cover-playing-together',
    icon: 'Gamepad2',
    grammarFocus: 'Social Phrases & Adjectives',
    publishStatus: PublishStatus.Published,
    estimatedTime: { [Level.Beginner4_6]: 5, [Level.Emerging7_9]: 4, [Level.FluentPrep10_12]: 3 },
    scenes: [
      {
        sceneId: 's4-sc1',
        order: 1,
        backgroundImageId: 'scene-playing-together-1',
        characters: ['dawit', 'desta'],
        panels: [
          {
            panelId: 's4-p1',
            order: 1,
            illustrationId: 'ill-playing-s4-p1-dawit-and-desta',
            textVariants: {
              [Level.Beginner4_6]: 'ይህ ዳዊት ነው። ይህች ደስታ ናት።',
              [Level.Emerging7_9]: 'ዳዊት እና ደስታ ጓደኛሞች ናቸው።',
              [Level.FluentPrep10_12]: 'ዳዊት እና ደስታ በፓርኩ ውስጥ የተገናኙ ምርጥ ጓደኛሞች ናቸው።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "This is Dawit. This is Desta.",
                [Level.Emerging7_9]: "Dawit and Desta are friends.",
                [Level.FluentPrep10_12]: 'Dawit and Desta are best friends who met at the park.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s4_p1_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s4_p1_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s4_p1_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's4-p2',
            order: 2,
            illustrationId: 'ill-playing-s4-p2-dawit-has-ball',
            textVariants: {
              [Level.Beginner4_6]: 'ዳዊት ኳስ አለው።',
              [Level.Emerging7_9]: 'ዳዊት አዲስ ኳስ አለው።',
              [Level.FluentPrep10_12]: 'ዳዊት ለልደቱ ቀን ያገኘውን አዲስ፣ የሚያብረቀርቅ ኳስ ይዞ መጣ።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "Dawit has a ball.",
                [Level.Emerging7_9]: "Dawit has a new ball.",
                [Level.FluentPrep10_12]: 'Dawit brought a new, shiny ball that he got for his birthday.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s4_p2_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s4_p2_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s4_p2_fluentprep10_12.mp3`,
            }
          },
           {
            panelId: 's4-p3',
            order: 3,
            illustrationId: 'ill-playing-s4-p3-big-red-ball',
            textVariants: {
              [Level.Beginner4_6]: 'ኳሱ ትልቅ ነው።',
              [Level.Emerging7_9]: 'ኳሱ ትልቅ እና ቀይ ነው።',
              [Level.FluentPrep10_12]: 'ለመምታት እና ለመያዝ በጣም ጥሩ የሆነ ትልቅ፣ ደማቅ ቀይ ኳስ ነው።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "The ball is big.",
                [Level.Emerging7_9]: "The ball is big and red.",
                [Level.FluentPrep10_12]: 'It is a big, bright red ball, perfect for kicking and catching.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s4_p3_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s4_p3_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s4_p3_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's4-p4',
            order: 4,
            illustrationId: 'ill-playing-s4-p4-desta-wants-to-play',
            textVariants: {
              [Level.Beginner4_6]: 'ደስታ መጫወት ትፈልጋለች።',
              [Level.Emerging7_9]: 'ደስታም በኳሱ ከዳዊት ጋር መጫወት ትፈልጋለች።',
              [Level.FluentPrep10_12]: 'ደስታ ኳሱን ስታይ፣ እሷም መጥታ መጫወት ፈለገች።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "Desta wants to play.",
                [Level.Emerging7_9]: "Desta wants to play with the ball too.",
                [Level.FluentPrep10_12]: 'When Desta sees the ball, she wants to join in and play too.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s4_p4_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s4_p4_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s4_p4_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's4-p5',
            order: 5,
            illustrationId: 'ill-playing-s4-p5-desta-asks-to-play',
            textVariants: {
              [Level.Beginner4_6]: '“እባክህ፣ ልጫወት?”',
              [Level.Emerging7_9]: 'ደስታ “እባክህ፣ ዳዊት፣ አብሬህ ልጫወት?” ብላ ጠየቀች።',
              [Level.FluentPrep10_12]: 'በደግነት፣ ደስታ ወደ ዳዊት ቀርባ፣ "እባክህ፣ ዳዊት፣ ካንተ ጋር መጫወት እችላለሁ?" አለች።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: '"Please, can I play?"',
                [Level.Emerging7_9]: 'Desta asked, "Please, Dawit, can I play with you?"',
                [Level.FluentPrep10_12]: 'Politely, Desta approaches Dawit and asks, "Please, Dawit, may I play with you?"',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s4_p5_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s4_p5_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s4_p5_fluentprep10_12.mp3`,
            },
            challengeType: ChallengeType.ListenRepeat,
            recordSlotId: 's4-p5-record',
          },
          {
            panelId: 's4-p6',
            order: 6,
            illustrationId: 'ill-playing-s4-p6-dawit-says-yes',
            textVariants: {
              [Level.Beginner4_6]: 'ዳዊት “__blank__” አለ።',
              [Level.Emerging7_9]: 'ዳዊት “__blank__፣ እንጫወት!” አለ።',
              [Level.FluentPrep10_12]: 'ዳዊት ፈገግ ብሎ "በእርግጥ! አዎ፣ አብረን እንጫወት!" በማለት በደስታ መለሰ።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: 'Dawit said, "__blank__".',
                [Level.Emerging7_9]: 'Dawit said, "__blank__, let\'s play!"',
                [Level.FluentPrep10_12]: 'Dawit smiled and replied happily, "Of course! Yes, let\'s play together!"',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s4_p6_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s4_p6_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s4_p6_fluentprep10_12.mp3`,
            },
            challengeType: ChallengeType.FillBlank,
            challengeAnswer: 'አዎ',
          },
          {
            panelId: 's4-p7',
            order: 7,
            illustrationId: 'ill-playing-s4-p7-dawit-kicks-ball',
            textVariants: {
              [Level.Beginner4_6]: 'ዳዊት ኳሱን መታ።',
              [Level.Emerging7_9]: 'ዳዊት ኳሱን ወደ ደስታ መታ።',
              [Level.FluentPrep10_12]: 'ለመጀመር፣ ዳዊት ወደ ኋላ ሄዶ ኳሱን በቀስታ ወደ ደስታ መታ።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "Dawit kicked the ball.",
                [Level.Emerging7_9]: "Dawit kicked the ball to Desta.",
                [Level.FluentPrep10_12]: 'To start, Dawit takes a step back and gently kicks the ball towards Desta.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s4_p7_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s4_p7_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s4_p7_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's4-p8',
            order: 8,
            illustrationId: 'ill-playing-s4-p8-desta-catches-ball',
            textVariants: {
              [Level.Beginner4_6]: 'ደስታ ኳሱን ያዘች።',
              [Level.Emerging7_9]: 'ደስታ ኳሱን በእጆቿ ያዘች።',
              [Level.FluentPrep10_12]: 'ደስታ ኳሱ ሲመጣ ተመልክታ በጥንቃቄ በሁለቱም እጆቿ ያዘችው።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "Desta caught the ball.",
                [Level.Emerging7_9]: "Desta caught the ball with her hands.",
                [Level.FluentPrep10_12]: "Desta watches the ball come towards her and carefully catches it with both hands.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s4_p8_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s4_p8_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s4_p8_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's4-p9',
            order: 9,
            illustrationId: 'ill-playing-s4-p9-playing-together',
            textVariants: {
              [Level.Beginner4_6]: 'በጋራ ይጫወታሉ።',
              [Level.Emerging7_9]: 'እነሱ በጋራ በመጫወት ተደሰቱ።',
              [Level.FluentPrep10_12]: 'ለረጅም ጊዜ፣ ዳዊት እና ደስታ ኳሱን እየተቀባበሉ በሳቅ ተሞልተው በጋራ ተጫወቱ።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "They play together.",
                [Level.Emerging7_9]: "They had fun playing together.",
                [Level.FluentPrep10_12]: "For a long time, Dawit and Desta played together, kicking the ball back and forth, filled with laughter.",
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s4_p9_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s4_p9_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s4_p9_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's4-p10',
            order: 10,
            illustrationId: 'ill-playing-s4-p10-they-are-happy',
            textVariants: {
              [Level.Beginner4_6]: 'እነሱ ደስተኞች ናቸው።',
              [Level.Emerging7_9]: 'አብሮ መጫወት ደስታ ነው።',
              [Level.FluentPrep10_12]: 'ከጓደኛ ጋር መጫወት እና መጋራት ሁለቱንም በጣም ደስተኛ ያደርባቸዋል።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "They are happy.",
                [Level.Emerging7_9]: "Playing together is fun.",
                [Level.FluentPrep10_12]: 'Playing and sharing with a friend makes them both very happy.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s4_p10_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s4_p10_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s4_p10_fluentprep10_12.mp3`,
            }
          },
        ],
      },
    ],
  },
  // STORY 5: HELPING MAMA
  {
    id: 'story-5-emerging',
    level: Level.Emerging7_9,
    title: 'እማማን መርዳት', // Helping Mama
    targetWords: ['እናት', 'ማብሰያ ቤት', 'መርዳት', 'ካሮት', 'ብርቱካናማ', 'እራት', 'መብላት', 'ጣፋጭ', 'አመሰግናለሁ'],
    coverImageId: 'cover-helping-mama',
    grammarFocus: 'Household Vocabulary & Verbs',
    publishStatus: PublishStatus.Published,
    estimatedTime: { [Level.Beginner4_6]: 5, [Level.Emerging7_9]: 4, [Level.FluentPrep10_12]: 3 },
    scenes: [
      {
        sceneId: 's5-sc1',
        order: 1,
        backgroundImageId: 'scene-helping-mama-1',
        characters: ['marta'],
        panels: [
          {
            panelId: 's5-p1',
            order: 1,
            illustrationId: 'ill-helping-s5-p1',
            textVariants: {
              [Level.Beginner4_6]: 'ይህች ማርታ ናት።',
              [Level.Emerging7_9]: 'ማርታ ከእናቷ ጋር ቤት ውስጥ ናት።',
              [Level.FluentPrep10_12]: 'አንድ ከሰአት በኋላ፣ ማርታ እናቷን በቤቱ ውስጥ ስትሠራ አየቻት።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "This is Marta.",
                [Level.Emerging7_9]: "Marta is at home with her mother.",
                [Level.FluentPrep10_12]: 'One afternoon, Marta saw her mother busy working around the house.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s5_p1_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s5_p1_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s5_p1_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's5-p2',
            order: 2,
            illustrationId: 'ill-helping-s5-p2',
            textVariants: {
              [Level.Beginner4_6]: 'እናት ማብሰያ ቤት ውስጥ ናት።',
              [Level.Emerging7_9]: 'እናት ማብሰያ ቤት ውስጥ እራት እየሰራች ነው።',
              [Level.FluentPrep10_12]: 'እሷ እናቷን ማብሰያ ቤት ውስጥ አገኘቻት፤ እናት ጣፋጭ የሆነ የእራት ምግብ እያዘጋጀች ነበር።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "Mother is in the kitchen.",
                [Level.Emerging7_9]: "Mother is making dinner in the kitchen.",
                [Level.FluentPrep10_12]: 'She found her mother in the kitchen, preparing a delicious-smelling dinner.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s5_p2_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s5_p2_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s5_p2_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's5-p3',
            order: 3,
            illustrationId: 'ill-helping-s5-p3',
            textVariants: {
              [Level.Beginner4_6]: 'ማርታ መርዳት ትፈልጋለች።',
              [Level.Emerging7_9]: 'ማርታ እናቷን መርዳት ትፈልጋለች።',
              [Level.FluentPrep10_12]: 'እናቷ ስራ በዝቶባት ስላየች፣ ማርታ እሷን ለመርዳት እና ነገሮችን ቀላል ለማድረግ ወሰነች።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "Marta wants to help.",
                [Level.Emerging7_9]: "Marta wants to help her mother.",
                [Level.FluentPrep10_12]: 'Seeing her mother was busy, Marta decided she wanted to help make things easier for her.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s5_p3_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s5_p3_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s5_p3_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's5-p4',
            order: 4,
            illustrationId: 'ill-helping-s5-p4',
            textVariants: {
              [Level.Beginner4_6]: '“እማማ፣ ልርዳሽ?”',
              [Level.Emerging7_9]: '“እማማ፣ እባክሽን ልርዳሽ?” ብላ ጠየቀች።',
              [Level.FluentPrep10_12]: 'በደግነት፣ "እማማ፣ እባክሽን እራት እንድትሰሪ ልርዳሽ?" ብላ ጠየቀች።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: '"Mama, can I help?"',
                [Level.Emerging7_9]: 'She asked, "Mama, please can I help you?"',
                [Level.FluentPrep10_12]: 'In a sweet voice, she asked, "Mama, please may I help you make dinner?"',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s5_p4_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s5_p4_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s5_p4_fluentprep10_12.mp3`,
            },
            challengeType: ChallengeType.ListenRepeat,
            recordSlotId: 's5-p4-record',
          },
          {
            panelId: 's5-p5',
            order: 5,
            illustrationId: 'ill-helping-s5-p5',
            textVariants: {
              [Level.Beginner4_6]: '“አዎ፣ አመሰግናለሁ።”',
              [Level.Emerging7_9]: 'እናት “አዎ፣ ውዴ፣ አመሰግናለሁ” አለች።',
              [Level.FluentPrep10_12]: 'እናቷ በፈገግታ "በእርግጥ ትችያለሽ ውድ ልጄ። በጣም አመሰግናለሁ!" አለቻት።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: '"Yes, thank you."',
                [Level.Emerging7_9]: 'Mother said, "Yes, my dear, thank you."',
                [Level.FluentPrep10_12]: 'Her mother smiled and said, "Of course you can, my dear. Thank you so much!"',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s5_p5_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s5_p5_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s5_p5_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's5-p6',
            order: 6,
            illustrationId: 'ill-helping-s5-p6',
            textVariants: {
              [Level.Beginner4_6]: 'ማርታ ካሮት ታጥባለች።',
              [Level.Emerging7_9]: 'ማርታ ካሮቶቹን በውሃ ታጥባለች።',
              [Level.FluentPrep10_12]: 'እናቷ ለማርታ ጥቂት ካሮቶችን ሰጠቻት፣ እና ማርታ በጥንቃቄ በውሃ ስር አጠበቻቸው።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "Marta washes carrots.",
                [Level.Emerging7_9]: "Marta washes the carrots with water.",
                [Level.FluentPrep10_12]: 'Her mother gave Marta some carrots, and Marta carefully washed them under the water.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s5_p6_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s5_p6_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s5_p6_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's5-p7',
            order: 7,
            illustrationId: 'ill-helping-s5-p7',
            textVariants: {
              [Level.Beginner4_6]: 'ካሮቱ __blank__ ነው።',
              [Level.Emerging7_9]: 'ካሮቱ ደማቅ __blank__ ቀለም አለው።',
              [Level.FluentPrep10_12]: 'ካሮቶቹ ከታጠቡ በኋላ፣ ደማቅ እና የሚያምር ብርቱካናማ ቀለማቸው ይታይ ነበር።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "The carrot is __blank__.",
                [Level.Emerging7_9]: "The carrot has a bright __blank__ color.",
                [Level.FluentPrep10_12]: 'After washing the carrots, their bright and beautiful orange color shone through.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s5_p7_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s5_p7_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s5_p7_fluentprep10_12.mp3`,
            },
            challengeType: ChallengeType.FillBlank,
            challengeAnswer: 'ብርቱካናማ',
          },
          {
            panelId: 's5-p8',
            order: 8,
            illustrationId: 'ill-helping-s5-p8',
            textVariants: {
              [Level.Beginner4_6]: 'አብረው እራት ይበላሉ።',
              [Level.Emerging7_9]: 'ቤተሰቡ አብሮ እራት ይበላል።',
              [Level.FluentPrep10_12]: 'እራቱ ሲዘጋጅ፣ መላው ቤተሰብ በጠረጴዛ ዙሪያ ተቀምጦ በጋራ ምግቡን ተመገበ።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "They eat dinner together.",
                [Level.Emerging7_9]: "The family eats dinner together.",
                [Level.FluentPrep10_12]: 'When dinner was ready, the whole family sat around the table and enjoyed the meal together.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s5_p8_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s5_p8_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s5_p8_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's5-p9',
            order: 9,
            illustrationId: 'ill-helping-s5-p9',
            textVariants: {
              [Level.Beginner4_6]: 'ምግቡ ጣፋጭ ነው!',
              [Level.Emerging7_9]: 'ማርታ "ምግቡ በጣም ጣፋጭ ነው!" አለች።',
              [Level.FluentPrep10_12]: 'አንድ ጉርሻ ከወሰደች በኋላ፣ ማርታ በደስታ "እማማ፣ ይህ ምግብ በጣም ጣፋጭ ነው!" አለች።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "The food is delicious!",
                [Level.Emerging7_9]: 'Marta said, "The food is very delicious!"',
                [Level.FluentPrep10_12]: 'After taking a bite, Marta exclaimed, "Mama, this food is absolutely delicious!"',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s5_p9_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s5_p9_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s5_p9_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's5-10',
            order: 10,
            illustrationId: 'ill-helping-s5-p10',
            textVariants: {
              [Level.Beginner4_6]: 'ማርታ ጥሩ ረዳት ናት።',
              [Level.Emerging7_9]: 'እናት ማርታ ጥሩ ረዳት እንደሆነች ነገረቻት።',
              [Level.FluentPrep10_12]: 'እናቷ ማርታን አቅፋ "አንቺ በጣም ጥሩ ረዳት ነሽ። በመርዳትሽ ኩራት ይሰማኛል።" አለቻት።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "Marta is a good helper.",
                [Level.Emerging7_9]: "Mother tells Marta she is a good helper.",
                [Level.FluentPrep10_12]: 'Her mother hugged Marta and said, "You are such a good helper. I am proud of you for helping."',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s5_p10_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s5_p10_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s5_p10_fluentprep10_12.mp3`,
            }
          },
        ],
      },
    ],
  },
  // STORY 6: BEDTIME
  {
    id: 'story-6-beginner',
    level: Level.Beginner4_6,
    title: 'የመኝታ ሰዓት', // Bedtime
    targetWords: ['ሌሊት', 'ጨረቃ', 'እጅ', 'ፊት', 'ጥርስ', 'አባት', 'መጽሐፍ', 'አንበሳ', 'አልጋ', 'መተኛት'],
    coverImageId: 'cover-bedtime',
    grammarFocus: 'Routine Verbs',
    publishStatus: PublishStatus.Published,
    estimatedTime: { [Level.Beginner4_6]: 5, [Level.Emerging7_9]: 4, [Level.FluentPrep10_12]: 3 },
    scenes: [
      {
        sceneId: 's6-sc1',
        order: 1,
        backgroundImageId: 'scene-bedtime-1',
        characters: ['abel'],
        panels: [
          {
            panelId: 's6-p1',
            order: 1,
            illustrationId: 'ill-bedtime-s6-p1-night-sky',
            textVariants: {
              [Level.Beginner4_6]: 'ሌሊት ነው።',
              [Level.Emerging7_9]: 'ሌሊት ሆኗል እና ጨረቃ ወጥታለች።',
              [Level.FluentPrep10_12]: 'ፀሐይ ጠልቃለች፣ እና ብሩህ ጨረቃ በጨለማው ሰማይ ላይ ከፍ ብላ ወጥታለች።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "It is night.",
                [Level.Emerging7_9]: "It is night and the moon is out.",
                [Level.FluentPrep10_12]: 'The sun has set, and the bright moon is high in the dark sky.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s6_p1_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s6_p1_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s6_p1_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's6-p2',
            order: 2,
            illustrationId: 'ill-bedtime-s6-p2-abel-is-tired',
            textVariants: {
              [Level.Beginner4_6]: 'አቤል ደክሞታል።',
              [Level.Emerging7_9]: 'ከረጅም ቀን በኋላ አቤል ደክሞታል።',
              [Level.FluentPrep10_12]: 'ከመጫወት እና ከመማር ረጅም ቀን በኋላ፣ አቤል በጣም ደክሞት ለመተኛት ዝግጁ ነው።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "Abel is tired.",
                [Level.Emerging7_9]: "Abel is tired after a long day.",
                [Level.FluentPrep10_12]: 'After a long day of playing and learning, Abel feels very tired and ready for bed.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s6_p2_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s6_p2_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s6_p2_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's6-p3',
            order: 3,
            illustrationId: 'ill-bedtime-s6-p3-abel-washes-face',
            textVariants: {
              [Level.Beginner4_6]: 'ፊቱን ይታጠባል።',
              [Level.Emerging7_9]: 'እጁን እና ፊቱን ይታጠባል።',
              [Level.FluentPrep10_12]: 'ለመኝታ ለመዘጋጀት፣ አቤል ወደ መታጠቢያ ቤት ሄዶ እጁን እና ፊቱን በሳሙና እና በውሃ ይታጠባል።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "He washes his face.",
                [Level.Emerging7_9]: "He washes his hands and face.",
                [Level.FluentPrep10_12]: 'To get ready for bed, Abel goes to the bathroom and washes his hands and face with soap and water.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s6_p3_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s6_p3_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s6_p3_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's6-p4',
            order: 4,
            illustrationId: 'ill-bedtime-s6-p4-abel-brushes-teeth',
            textVariants: {
              [Level.Beginner4_6]: 'ጥርሱን ይቦርሻል።',
              [Level.Emerging7_9]: 'አቤል ጥርሱን ይቦርሻል።',
              [Level.FluentPrep10_12]: 'በመቀጠል፣ አቤል ጥርሱን በብሩሽ እና በሳሙና ይቦርሻል።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "He brushes his teeth.",
                [Level.Emerging7_9]: "Abel brushes his teeth.",
                [Level.FluentPrep10_12]: 'Next, Abel brushes his teeth with a brush and toothpaste.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s6_p4_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s6_p4_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s6_p4_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's6-p5',
            order: 5,
            illustrationId: 'ill-bedtime-s6-p5-abel-wears-pajamas',
            textVariants: {
              [Level.Beginner4_6]: 'ፒጃማ ይለብሳል።',
              [Level.Emerging7_9]: 'ለመተኛት ፒጃማ ይለብሳል።',
              [Level.FluentPrep10_12]: 'ንጹህ ከሆነ በኋላ፣ አቤል ምቹ የሆነ የመኝታ ልብሱን ይለብሳል።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "He wears pajamas.",
                [Level.Emerging7_9]: "He wears pajamas to sleep.",
                [Level.FluentPrep10_12]: 'After getting clean, Abel puts on his comfortable sleepwear.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s6_p5_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s6_p5_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s6_p5_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's6-p6',
            order: 6,
            illustrationId: 'ill-bedtime-s6-p6-papa-reads-book',
            textVariants: {
              [Level.Beginner4_6]: 'አባቱ መጽሐፍ ያነብለታል።',
              [Level.Emerging7_9]: 'አባቱ ተረት ያነብለታል።',
              [Level.FluentPrep10_12]: 'አባቱ አልጋው ጫፍ ላይ ተቀምጦ ለአቤል የሚወደውን ተረት ያነብለታል።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "His father reads him a book.",
                [Level.Emerging7_9]: "His father reads him a story.",
                [Level.FluentPrep10_12]: 'His father sits on the edge of the bed and reads Abel his favorite story.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s6_p6_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s6_p6_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s6_p6_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's6-p7',
            order: 7,
            illustrationId: 'ill-bedtime-s6-p7-lion-in-book',
            textVariants: {
              [Level.Beginner4_6]: 'መጽሐፉ ስለ __blank__ ነው።',
              [Level.Emerging7_9]: 'ታሪኩ ስለ አንድ ትልቅ __blank__ ነው።',
              [Level.FluentPrep10_12]: 'በመጽሐፉ ውስጥ ያለው ታሪክ ጫካ ውስጥ ስለሚኖር አንድ ደግ አንበሳ ነው።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "The book is about a __blank__.",
                [Level.Emerging7_9]: "The story is about a big __blank__.",
                [Level.FluentPrep10_12]: 'The story in the book is about a kind lion living in the jungle.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s6_p7_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s6_p7_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s6_p7_fluentprep10_12.mp3`,
            },
            challengeType: ChallengeType.FillBlank,
            challengeAnswer: 'አንበሳ',
          },
          {
            panelId: 's6-p8',
            order: 8,
            illustrationId: 'ill-bedtime-s6-p8-abel-in-bed',
            textVariants: {
              [Level.Beginner4_6]: 'አቤል አልጋ ውስጥ ገባ።',
              [Level.Emerging7_9]: 'አቤል አልጋው ላይ ተኛ።',
              [Level.FluentPrep10_12]: 'ታሪኩ ሲያልቅ፣ አቤል ወደ ሞቀ አልጋው ገብቶ ተመቻቸ።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "Abel got into bed.",
                [Level.Emerging7_9]: "Abel lay on his bed.",
                [Level.FluentPrep10_12]: 'When the story ended, Abel got into his warm bed and got comfortable.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s6_p8_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s6_p8_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s6_p8_fluentprep10_12.mp3`,
            }
          },
          {
            panelId: 's6-p9',
            order: 9,
            illustrationId: 'ill-bedtime-s6-p9-abel-says-goodnight',
            textVariants: {
              [Level.Beginner4_6]: 'ደህና እደር አባባ።',
              [Level.Emerging7_9]: 'አቤል "ደህና እደሩ" አለ።',
              [Level.FluentPrep10_12]: 'አቤል ለአባቱ "ደህና እደሩ" ብሎ ተሰናበተ።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "Goodnight.",
                [Level.Emerging7_9]: 'Abel said "Goodnight".',
                [Level.FluentPrep10_12]: 'Abel said "Goodnight" to his father.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s6_p9_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s6_p9_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s6_p9_beginner4_6.mp3`,
            },
            challengeType: ChallengeType.ListenRepeat,
            recordSlotId: 's6-p9-record',
          },
          {
            panelId: 's6-p10',
            order: 10,
            illustrationId: 'ill-bedtime-s6-p10-abel-is-sleeping',
            textVariants: {
              [Level.Beginner4_6]: 'አቤል ተኝቷል።',
              [Level.Emerging7_9]: 'አሁን አቤል እንቅልፍ ወስዶታል።',
              [Level.FluentPrep10_12]: 'አቤል ጣፋጭ እንቅልፍ ተኝቶ እያለም ነው።',
            },
            textEnglishVariants: {
                [Level.Beginner4_6]: "Abel is sleeping.",
                [Level.Emerging7_9]: "Now Abel has fallen asleep.",
                [Level.FluentPrep10_12]: 'Abel is sleeping soundly and dreaming.',
            },
            audioVariants: {
                [Level.Beginner4_6]: `${AUDIO_BASE}/story_s6_p10_beginner4_6.mp3`,
                [Level.Emerging7_9]: `${AUDIO_BASE}/story_s6_p10_emerging7_9.mp3`,
                [Level.FluentPrep10_12]: `${AUDIO_BASE}/story_s6_p10_fluentprep10_12.mp3`,
            }
          },
        ],
      },
    ],
  },
];