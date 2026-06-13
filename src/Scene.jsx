import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Sparkles, Float, Text } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';

const starWords = [
  "Любовь моя, моя сияющая луна", // Sevgilim, parıldayan ayım
  "Друг моей души, мой самый близкий человек", // Can dostum, en yakınım
  "Повелительница всех красавиц", // Güzellerin şahı sultanım
  "Смысл моей жизни, мой Рай", // Hayatımın, yaşamımın sebebi Cennetim
  "Мой райский нектар", // Kevser şarabım
  "Моя весна, моя радость, смысл моих дней", // Baharım, sevincim, günlerimin anlamı
  "Любовь, запечатленная в моем сердце", // Gönlüme nakşolmuş resim gibi sevgilim
  "Моя улыбающаяся роза", // Benim gülen gülüm
  "Источник моей радости, вкус в моем бокале", // Sevinç kaynağım, içkimdeki lezzet
  "Мое веселое собрание", // Eğlenceli meclisim
  "Мой лучезарный свет, мой факел", // Nurlu parlak ışığım, meş’alem
  "Мой померанец, мой гранат, мой цитрус", // Turuncum, narım, narencim
  "Свет моих ночей и моей комнаты свиданий", // Benim gecelerimin, visal odamın aydınlığı
  "Моя сладость, мой сахар, мое сокровище", // Nebatım, şekerim, hazinem
  "Моя нетронутая, чистая любовь", // Cihanda hiç örselenmemiş, el değmemiş sevgilim
  "Владычица Египта в моем сердце", // Gönlümdeki Mısır’ın Sultanı
  "Мой несравненный Юсуф", // Hazret-i Yusuf’um
  "Смысл моего существования", // Varlığımın anlamı
  "Мой Стамбул, мой Караман", // İstanbul’um, Karaman’ım
  "Любовь, что стоит всех земель Анатолии и Румелии", // Bütün Anadolu ve Rum ülkesindeki diyara bedel sevgilim
  "Мой Бадахшан, где рождаются рубины", // Değerli lal madeninin çıktığı yer olan Bedahşan’ım
  "Мой Кыпчак, мой Багдад, мой Хорасан", // Ve Kıpçağım, Bağdad’ım, Horasan’ım
  "Моя любовь с прекрасными волосами", // Güzel saçlım
  "С бровями словно лук, с сияющими глазами", // Yay kaşlım, gözleri ışıl ışıl sevgilim
  "У твоей двери я безустанно восхваляю тебя", // Kapında, devamlı olarak seni medhederim, seni överim
  "Словно рожден лишь для того, чтобы воспевать тебя" // Sanki hep seni öğmek için görevlendirilmiş gibiyim
];

export default function Scene({ setActiveNode }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.2} color="#FFD700" />

      <group ref={groupRef}>
        {/* Etkileşimli Altın Düğümler */}
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[-2, 0, 0]} onClick={() => setActiveNode(1)} className="cursor-pointer">
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={2} roughness={0.1} />
          </mesh>
        </Float>

        <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[2, 1, -2]} onClick={() => setActiveNode(2)} className="cursor-pointer">
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={2} roughness={0.1} />
          </mesh>
        </Float>

        {/* Yıldız Kelimeler */}
        {starWords.map((word, index) => (
          <Float key={index} speed={1} rotationIntensity={0.5} floatIntensity={1}>
            <Text
              position={[Math.random() * 16 - 8, Math.random() * 12 - 6, Math.random() * -10]}
              fontSize={0.2}
              color="#FFD700"
              fillOpacity={0.6}
              anchorX="center"
              anchorY="middle"
            >
              {word}
            </Text>
          </Float>
        ))}
      </group>

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
      </EffectComposer>
    </>
  );
}