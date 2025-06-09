import React, { useState, useEffect } from 'react';
import { ChevronRight, Heart, Calendar, Apple, Dumbbell, Target, CheckCircle, Plus, Star, Baby } from 'lucide-react';

const PostpartumFitnessApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentWeek, setCurrentWeek] = useState(1);
  const [completedWorkouts, setCompletedWorkouts] = useState(new Set());
  const [isAnimating, setIsAnimating] = useState(false);

  const workoutPlan = {
    "1-2": {
      title: "Foundation & Activation",
      description: "Building the foundation with gentle activation exercises",
      days: [
        {
          name: "Lower Body: Glute + Hamstring Focus",
          exercises: ["Smith Machine Glute-Focused Squats", "Romanian Deadlifts", "Cable Kickbacks", "Step-ups (low height)", "Stability Ball Hamstring Curls"],
          duration: "45-50 min"
        },
        {
          name: "Upper Body: Toning + Core",
          exercises: ["Lat Pulldown or Assisted Pull-ups", "Dumbbell Shoulder Press", "Cable Rows", "Bicep Curls + Tricep Kickbacks", "Plank + Bird-Dogs"],
          duration: "40-45 min"
        },
        {
          name: "Lower Body: Glute Volume",
          exercises: ["Hip Thrusts", "Sumo Deadlifts", "Reverse Lunges", "Leg Press (feet wide/high)", "Cable Side Kicks"],
          duration: "45-50 min"
        },
        {
          name: "Active Recovery or Glute/Ab Burn",
          exercises: ["Glute Bridge Pulses", "Wall Sit with Band", "Abductions", "Leg Raises", "Russian Twists"],
          duration: "30-35 min",
          optional: true
        }
      ]
    },
    "3-4": {
      title: "Volume & Control",
      description: "Increasing volume while maintaining perfect form",
      days: [
        {
          name: "Lower Body: Glute + Hamstring Focus",
          exercises: ["Smith Machine Glute-Focused Squats", "Romanian Deadlifts", "Cable Kickbacks", "Step-ups (medium height)", "Stability Ball Hamstring Curls"],
          duration: "50-55 min"
        },
        {
          name: "Upper Body: Toning + Core",
          exercises: ["Lat Pulldown or Assisted Pull-ups", "Dumbbell Shoulder Press", "Cable Rows", "Bicep Curls + Tricep Kickbacks", "Plank + Bird-Dogs"],
          duration: "45-50 min"
        },
        {
          name: "Lower Body: Glute Volume",
          exercises: ["Hip Thrusts", "Sumo Deadlifts", "Reverse Lunges", "Leg Press (feet wide/high)", "Cable Side Kicks"],
          duration: "50-55 min"
        },
        {
          name: "Active Recovery or Glute/Ab Burn",
          exercises: ["Glute Bridge Pulses", "Wall Sit with Band", "Abductions", "Leg Raises", "Russian Twists"],
          duration: "35-40 min",
          optional: true
        }
      ]
    },
    "5-6": {
      title: "Strength Progression",
      description: "Building strength with progressive overload",
      days: [
        {
          name: "Lower Body: Glute + Hamstring Focus",
          exercises: ["Smith Machine Glute-Focused Squats", "Romanian Deadlifts", "Cable Kickbacks", "Step-ups (higher height)", "Stability Ball Hamstring Curls"],
          duration: "55-60 min"
        },
        {
          name: "Upper Body: Toning + Core",
          exercises: ["Lat Pulldown or Pull-ups", "Dumbbell Shoulder Press", "Cable Rows", "Bicep Curls + Tricep Kickbacks", "Advanced Plank Variations"],
          duration: "50-55 min"
        },
        {
          name: "Lower Body: Glute Volume",
          exercises: ["Heavy Hip Thrusts", "Sumo Deadlifts", "Walking Lunges", "Leg Press (feet wide/high)", "Cable Side Kicks"],
          duration: "55-60 min"
        },
        {
          name: "Active Recovery or Glute/Ab Burn",
          exercises: ["Glute Bridge Pulses", "Wall Sit with Band", "Abductions", "Leg Raises", "Russian Twists"],
          duration: "40-45 min",
          optional: true
        }
      ]
    },
    "7-8": {
      title: "Conditioning & Muscle Growth",
      description: "Peak conditioning with muscle growth focus",
      days: [
        {
          name: "Lower Body: Glute + Hamstring Focus",
          exercises: ["Smith Machine Glute-Focused Squats", "Romanian Deadlifts", "Cable Kickbacks", "Box Step-ups", "Stability Ball Hamstring Curls"],
          duration: "60-65 min"
        },
        {
          name: "Upper Body: Toning + Core",
          exercises: ["Pull-ups", "Dumbbell Shoulder Press", "Cable Rows", "Superset Bicep/Tricep", "Core Circuit"],
          duration: "55-60 min"
        },
        {
          name: "Lower Body: Glute Volume",
          exercises: ["Heavy Hip Thrusts", "Sumo Deadlifts", "Bulgarian Split Squats", "Leg Press (feet wide/high)", "Cable Side Kicks"],
          duration: "60-65 min"
        },
        {
          name: "Active Recovery or Glute/Ab Burn",
          exercises: ["Advanced Glute Circuit", "Wall Sit with Band", "Abductions", "Advanced Core", "Russian Twists"],
          duration: "45-50 min",
          optional: true
        }
      ]
    }
  };

  const supplements = [
    { name: "Protein Powder", dose: "20-25g/serving", benefit: "Muscle recovery & growth", icon: "💪" },
    { name: "Creatine", dose: "3-5g daily", benefit: "Supports muscle growth", icon: "⚡" },
    { name: "Collagen", dose: "Daily", benefit: "Joint & ligament health", icon: "🦴" },
    { name: "Magnesium Glycinate", dose: "Daily", benefit: "Sleep & recovery", icon: "😴" },
    { name: "Omega-3", dose: "Daily", benefit: "Reduces inflammation", icon: "🐟" },
    { name: "Vitamin D3", dose: "Daily", benefit: "Essential postpartum", icon: "☀️" },
    { name: "Multivitamin", dose: "Daily", benefit: "Complete nutrients", icon: "🌈" }
  ];

  const mealPlan = {
    breakfast: ["2 eggs + 2 egg whites + sautéed spinach + sourdough", "Protein coffee or shake"],
    snack1: ["Greek yogurt + berries + chia seeds"],
    lunch: ["Grilled salmon or chicken", "Quinoa or sweet potato", "Mixed greens with olive oil & lemon"],
    snack2: ["Rice cakes + almond butter", "Protein shake if needed"],
    dinner: ["Ground turkey or tofu stir-fry", "Veggies (broccoli, zucchini, carrots)", "Brown rice or cauliflower rice"],
    evening: ["Cottage cheese or protein mug cake (optional)"]
  };

  const macros = {
    protein: "100-120g/day",
    carbs: "120-180g/day", 
    fats: "60-70g/day"
  };

  const getWeekPhase = (week) => {
    if (week <= 2) return "1-2";
    if (week <= 4) return "3-4";
    if (week <= 6) return "5-6";
    return "7-8";
  };

  const completeWorkout = (dayIndex) => {
    const workoutId = `${currentWeek}-${dayIndex}`;
    setCompletedWorkouts(prev => new Set([...prev, workoutId]));
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const TabButton = ({ id, icon: Icon, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center py-2 px-4 rounded-2xl transition-all duration-300 transform ${
        active 
          ? 'bg-gradient-to-r from-pink-200 to-purple-200 text-purple-700 scale-105 shadow-lg' 
          : 'text-gray-500 hover:text-purple-600 hover:scale-105'
      }`}
    >
      <Icon size={20} className={`mb-1 ${active ? 'animate-bounce' : ''}`} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );

  const HomeTab = () => {
    const phase = getWeekPhase(currentWeek);
    const currentPlan = workoutPlan[phase];
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Week {currentWeek}</h2>
              <p className="text-purple-600 font-medium">{currentPlan.title}</p>
            </div>
            <div className="bg-white rounded-full p-3 shadow-md">
              <Baby className="text-pink-500" size={24} />
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{currentPlan.description}</p>
          
          <div className="flex justify-between mt-4 pt-4 border-t border-white/50">
            <button
              onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
              disabled={currentWeek === 1}
              className="bg-white/80 px-4 py-2 rounded-xl text-purple-600 font-medium disabled:opacity-50 hover:bg-white transition-all"
            >
              ← Previous
            </button>
            <button
              onClick={() => setCurrentWeek(Math.min(8, currentWeek + 1))}
              disabled={currentWeek === 8}
              className="bg-white/80 px-4 py-2 rounded-xl text-purple-600 font-medium disabled:opacity-50 hover:bg-white transition-all"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Workout Days */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Dumbbell className="mr-2 text-purple-600" size={20} />
            This Week's Workouts
          </h3>
          
          {currentPlan.days.map((day, index) => {
            const workoutId = `${currentWeek}-${index}`;
            const isCompleted = completedWorkouts.has(workoutId);
            
            return (
              <div key={index} className={`bg-white rounded-2xl p-4 shadow-md border-2 transition-all duration-300 ${
                isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-100 hover:border-purple-200'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      Day {index + 1}: {day.name}
                      {day.optional && <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Optional</span>}
                    </h4>
                    <p className="text-sm text-gray-500">{day.duration}</p>
                  </div>
                  <button
                    onClick={() => completeWorkout(index)}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-green-500 text-white scale-110' 
                        : 'bg-gray-100 text-gray-400 hover:bg-purple-100 hover:text-purple-600'
                    } ${isAnimating ? 'animate-pulse' : ''}`}
                  >
                    <CheckCircle size={20} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  {day.exercises.map((exercise, exerciseIndex) => (
                    <div key={exerciseIndex} className="flex items-center py-2 px-3 bg-gray-50 rounded-xl">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-purple-600">{exerciseIndex + 1}</span>
                      </div>
                      <span className="text-sm text-gray-700 flex-1">{exercise}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const NutritionTab = () => (
    <div className="space-y-6">
      {/* Macros */}
      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-3xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Target className="mr-2 text-green-600" size={24} />
          Daily Macro Goals
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/80 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-red-500">{macros.protein}</div>
            <div className="text-sm text-gray-600 font-medium">Protein</div>
          </div>
          <div className="bg-white/80 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{macros.carbs}</div>
            <div className="text-sm text-gray-600 font-medium">Carbs</div>
          </div>
          <div className="bg-white/80 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">{macros.fats}</div>
            <div className="text-sm text-gray-600 font-medium">Fats</div>
          </div>
        </div>
      </div>

      {/* Meal Plan */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Apple className="mr-2 text-red-500" size={20} />
          Sample Meal Plan
        </h3>
        
        <div className="space-y-4">
          {Object.entries(mealPlan).map(([mealType, items]) => (
            <div key={mealType} className="border-l-4 border-purple-300 pl-4">
              <h4 className="font-semibold text-gray-800 capitalize text-sm mb-2">
                {mealType === 'snack1' ? 'Morning Snack' : 
                 mealType === 'snack2' ? 'Afternoon Snack' : 
                 mealType === 'evening' ? 'Evening (Optional)' : mealType}
              </h4>
              {items.map((item, index) => (
                <div key={index} className="text-sm text-gray-600 mb-1 flex items-center">
                  <div className="w-2 h-2 bg-purple-300 rounded-full mr-2"></div>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SupplementsTab = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-3xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
          <Star className="mr-2 text-orange-500" size={24} />
          Recommended Supplements
        </h2>
        <p className="text-gray-600 text-sm">Safe & effective for postpartum recovery</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {supplements.map((supplement, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 hover:border-purple-200 transition-all">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{supplement.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{supplement.name}</h3>
                <p className="text-purple-600 font-medium text-sm">{supplement.dose}</p>
                <p className="text-gray-600 text-sm mt-1">{supplement.benefit}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
        <p className="text-blue-800 text-sm">
          <strong>Note:</strong> Always consult with your healthcare provider before starting any new supplements, especially while breastfeeding.
        </p>
      </div>
    </div>
  );

  const ProgressTab = () => {
    const totalWorkouts = Object.values(workoutPlan).reduce((acc, phase) => acc + phase.days.length, 0);
    const weekCompletedWorkouts = Array.from(completedWorkouts).filter(id => id.startsWith(`${currentWeek}-`)).length;
    const totalCompletedWorkouts = completedWorkouts.size;
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Heart className="mr-2 text-pink-500" size={24} />
            Your Progress
          </h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/80 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">{currentWeek}</div>
              <div className="text-sm text-gray-600">Current Week</div>
            </div>
            <div className="bg-white/80 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{totalCompletedWorkouts}</div>
              <div className="text-sm text-gray-600">Workouts Done</div>
            </div>
          </div>

          <div className="bg-white/80 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">This Week</span>
              <span className="text-sm text-gray-600">{weekCompletedWorkouts}/4</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(weekCompletedWorkouts / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Overview</h3>
          <div className="grid grid-cols-4 gap-2">
            {[1,2,3,4,5,6,7,8].map(week => {
              const weekWorkouts = Array.from(completedWorkouts).filter(id => id.startsWith(`${week}-`)).length;
              return (
                <div key={week} className={`p-3 rounded-xl text-center transition-all ${
                  week === currentWeek 
                    ? 'bg-purple-100 border-2 border-purple-300' 
                    : 'bg-gray-50'
                }`}>
                  <div className="text-xs text-gray-600 mb-1">Week {week}</div>
                  <div className="text-lg font-bold text-purple-600">{weekWorkouts}/4</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-4">
          <p className="text-gray-700 text-sm text-center">
            🌟 <strong>Remember:</strong> Consistency over perfection! Listen to your body and celebrate every workout completed.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 px-6 pt-12 pb-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Postpartum Fitness Journey
        </h1>
        <p className="text-center text-gray-600 text-sm mt-1">10 months postpartum • 3-4 days/week</p>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-24">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'nutrition' && <NutritionTab />}
        {activeTab === 'supplements' && <SupplementsTab />}
        {activeTab === 'progress' && <ProgressTab />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-sm w-full bg-white border-t border-gray-200 px-4 py-3 rounded-t-3xl shadow-2xl">
        <div className="flex items-center justify-around">
          <TabButton 
            id="home" 
            icon={Calendar} 
            label="Workouts" 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
          />
          <TabButton 
            id="nutrition" 
            icon={Apple} 
            label="Nutrition" 
            active={activeTab === 'nutrition'} 
            onClick={() => setActiveTab('nutrition')} 
          />
          <TabButton 
            id="supplements" 
            icon={Plus} 
            label="Supplements" 
            active={activeTab === 'supplements'} 
            onClick={() => setActiveTab('supplements')} 
          />
          <TabButton 
            id="progress" 
            icon={Heart} 
            label="Progress" 
            active={activeTab === 'progress'} 
            onClick={() => setActiveTab('progress')} 
          />
        </div>
      </div>
    </div>
  );
};

export default PostpartumFitnessApp;
