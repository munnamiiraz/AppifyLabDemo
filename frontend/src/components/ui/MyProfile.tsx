import { useState } from 'react';
import { MapPin, Briefcase, Heart, Calendar, Camera, Edit2, Users, Image, MoreHorizontal, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState('posts');
  
  const userPosts = [
    {
      id: 1,
      content: "Just launched my new project! Excited to share it with everyone 🚀",
      timestamp: "2 hours ago",
      privacy: "Public",
      likes: 45,
      comments: 12,
      shares: 3,
      image: null
    },
    {
      id: 2,
      content: "Beautiful sunset today! Nature never disappoints.",
      timestamp: "1 day ago",
      privacy: "Public",
      likes: 128,
      comments: 23,
      shares: 8,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      content: "Working on some exciting new features. Can't wait to show you all!",
      timestamp: "3 days ago",
      privacy: "Friends",
      likes: 67,
      comments: 15,
      shares: 2,
      image: null
    }
  ];

  const profileStats = {
    posts: 156,
    friends: 892,
    photos: 234
  };

  return (
    <div className="bg-gray-100 pb-8 pt-20">
      <div className="max-w-6xl mx-auto">
        {/* Cover Photo */}
        <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-64 relative rounded-b-lg">
          <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:bg-gray-50">
            <Camera className="w-4 h-4" />
            <span className="text-sm font-semibold">Edit cover photo</span>
          </button>
        </div>

        {/* Profile Info Section */}
        <div className="px-4">
        <div className="bg-white rounded-b-lg shadow-sm pb-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between px-4">
            {/* Profile Picture */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 -mt-20 mb-4 md:mb-0">
              <div className="relative">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=test1"
                  alt="Profile"
                  className="w-40 h-40 rounded-full border-4 border-white shadow-lg bg-white"
                />
                <button className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <div className="text-center md:text-left mb-4">
                <h1 className="text-3xl font-bold text-gray-900">test1 test2</h1>
                <p className="text-gray-600">CEO of Apple</p>
                <p className="text-gray-500 text-sm mt-1">{profileStats.friends} friends</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mb-4">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 flex items-center gap-2">
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-t mt-4 px-4">
            <div className="flex gap-2 overflow-x-auto">
              {['posts', 'about', 'friends', 'photos'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-semibold capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-blue-500 border-b-4 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-100 rounded-lg'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          {/* Left Sidebar */}
          <div className="space-y-4">
            {/* Intro Card */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-xl font-bold mb-4">Intro</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <Briefcase className="w-5 h-5 text-gray-500" />
                  <span>CEO at Apple</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>Lives in Cupertino, CA</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Heart className="w-5 h-5 text-gray-500" />
                  <span>Single</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span>Joined March 2024</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-gray-200 hover:bg-gray-300 py-2 rounded-lg font-semibold">
                Edit Details
              </button>
            </div>

            {/* Photos Card */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Photos</h2>
                <button className="text-blue-500 text-sm hover:underline">See all</button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?w=200&h=200&fit=crop`}
                      alt={`Photo ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Friends Card */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Friends</h2>
                <button className="text-blue-500 text-sm hover:underline">See all</button>
              </div>
              <p className="text-gray-600 text-sm mb-4">{profileStats.friends} friends</p>
              <div className="grid grid-cols-3 gap-2">
                {['Steve Jobs', 'Ryan Roslansky', 'Dylan Field', 'Sarah Chen', 'Mike Wilson', 'Emma Davis'].map((name, i) => (
                  <div key={i} className="text-center">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                      alt={name}
                      className="w-full aspect-square rounded-lg bg-gray-200 mb-1"
                    />
                    <p className="text-xs font-semibold text-gray-700 truncate">{name.split(' ')[0]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-4">
            {/* Create Post Card */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex gap-3">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=test1"
                  alt="Your avatar"
                  className="w-10 h-10 rounded-full"
                />
                <input
                  type="text"
                  placeholder="What's on your mind, test1?"
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  readOnly
                />
              </div>
              <div className="flex justify-around mt-4 pt-4 border-t">
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg">
                  <Image className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600 font-semibold">Photo/Video</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-600 font-semibold">Tag People</span>
                </button>
              </div>
            </div>

            {/* Posts Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Posts</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold text-sm">
                    Filters
                  </button>
                  <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold text-sm">
                    Manage Posts
                  </button>
                </div>
              </div>
            </div>

            {/* Posts */}
            {userPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm">
                {/* Post Header */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=test1"
                      alt="Your avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">test1 test2</h3>
                      <p className="text-xs text-gray-500">{post.timestamp} · {post.privacy}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <MoreHorizontal className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Post Content */}
                <div className="px-4 pb-3">
                  <p className="text-gray-900">{post.content}</p>
                </div>

                {/* Post Image */}
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full max-h-96 object-cover"
                  />
                )}

                {/* Post Stats */}
                <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-600 border-b">
                  <span>{post.likes} likes</span>
                  <div className="flex gap-3">
                    <span>{post.comments} comments</span>
                    <span>{post.shares} shares</span>
                  </div>
                </div>

                {/* Post Actions */}
                <div className="px-4 py-2 flex justify-around">
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg flex-1 justify-center">
                    <ThumbsUp className="w-5 h-5" />
                    <span className="font-semibold">Like</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg flex-1 justify-center">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-semibold">Comment</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg flex-1 justify-center">
                    <Share2 className="w-5 h-5" />
                    <span className="font-semibold">Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}