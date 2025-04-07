export const AnimatedGradientBackground = () => {
  return (
    <div
        className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-pink-200 via-purple-200 to-rose-200"
        style={{
            backgroundSize: '400% 400%',
        }}
    ></div>
  );
};