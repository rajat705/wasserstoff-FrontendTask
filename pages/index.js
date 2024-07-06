import IDE from '../components/IDE';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl mb-4">Custom IDE</h1>
      <IDE />
    </div>
  );
};

export default HomePage;
