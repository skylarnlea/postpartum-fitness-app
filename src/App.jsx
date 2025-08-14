import React, { useState, useEffect } from 'react';
import { ChevronRight, Heart, Calendar, Apple, Dumbbell, Target, CheckCircle, Plus, Star, Baby, X } from 'lucide-react';

const PostpartumFitnessApp = () => {
  const [activeTab, setActiveTab] = useState('workouts');
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [completedNutrition, setCompletedNutrition] = useState([]);
  const [completedSupplements, setCompletedSupplements] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseData, setExerciseData] = useState({});
  const [lastResetDate, setLastResetDate] = useState(new Date().toDateString());

  // Data structures
  const workoutPlan = [
    {
      day: "Day 1 – Lower Body (Knee-Friendly)",
      focus: "Glute & Posterior Chain Focus",
      color: "from-rose-200 to-pink-200",
      exercises: [
        "Hip Thrusts – 4×10–12",
        "Romanian Deadlifts – 4×10–12",
        "Cable Kickbacks – 3×12–15/leg",
        "Side-Lying Hip Abductions – 3×15–20/leg",
        "Glute Bridges (bodyweight burnout) – 2×20"
      ]
    },
    {
      day: "Day 2 – Upper Body (Arm + Shoulder Focus)",
      focus: "Arm & Shoulder Development",
      color: "from-purple-200 to-indigo-200",
      exercises: [
        "Seated Dumbbell Shoulder Press – 4×10–12",
        "Dumbbell Lateral Raises – 3×12–15",
        "Dumbbell Bicep Curls – 3×10–12",
        "Overhead Dumbbell Tricep Extensions – 3×10–12",
        "Face Pulls or Band Pull-Aparts – 3×12–15"
      ]
    },
    {
      day: "Day 3 – Full Body + Arms",
      focus: "Full Body Compound Movement",
      color: "from-teal-200 to-cyan-200",
      exercises: [
        "Bulgarian Split Squats (rear leg low or on pad) – 3×10–12/leg",
        "Incline Dumbbell Bench Press – 3×8–10",
        "Lat Pulldowns – 3×8–10",
        "Dumbbell Hammer Curls – 3×10–12",
        "Cable Rope Tricep Pushdowns – 3×12–15"
      ]
    },
    {
      day: "Optional Day 4 – Lower Body (Glutes/Posterior Chain)",
      focus: "Additional Glute & Posterior Focus",
      color: "from-amber-200 to-orange-200",
      exercises: [
        "Banded Hip Thrusts – 4×12–15",
        "Step-Ups (low step for knee comfort) – 3×10/leg",
        "Dumbbell Deadlifts – 4×8–10",
        "Clamshells – 3×15–20/leg",
        "Plank (hold 30–60s × 3)"
      ]
    },
    {
      day: "Light Cardio / Abs Days (Optional)",
      focus: "Active Recovery & Core",
      color: "from-green-200 to-emerald-200",
      exercises: [
        "Cardio: Incline treadmill walk, elliptical, or cycling — 20–30 min, easy pace",
        "Dead Bugs – 2–3 rounds",
        "Bird Dogs – 2–3 rounds",
        "Side Plank Holds – 2–3 rounds"
      ]
    }
  ];

  const dailyGoals = [
    "80 oz of water daily",
    "110-140g protein",
    "Workout of the day"
  ];

  const nutritionPlan = [
    {
      category: "Breakfast",
      icon: "🌅",
      color: "from-amber-100 to-yellow-100",
      options: [
        {
          title: "Option 1",
          items: [
            "2 whole eggs + 3 egg whites scrambled in olive oil",
            "1 slice whole grain toast",
            "½ avocado",
            "1 cup berries"
          ]
        },
        {
          title: "Option 2",
          items: [
            "Protein smoothie (1 scoop whey, 1 cup unsweetened almond milk, 1 tbsp peanut butter, ½ banana, handful spinach)",
            "1 slice whole grain toast or ½ cup oatmeal"
          ]
        }
      ]
    },
    {
      category: "Lunch",
      icon: "🌞",
      color: "from-blue-100 to-cyan-100",
      options: [
        {
          title: "Option 1",
          items: [
            "5 oz lean ground beef (90/10)",
            "1 cup roasted sweet potato",
            "1 cup broccoli or asparagus",
            "1 tsp olive oil drizzle"
          ]
        },
        {
          title: "Option 2",
          items: [
            "5 oz salmon",
            "1 cup quinoa or brown rice",
            "1 cup zucchini or green beans",
            "1 tsp olive oil or grass-fed butter"
          ]
        }
      ]
    },
    {
      category: "Dinner",
      icon: "🌙",
      color: "from-purple-100 to-indigo-100",
      options: [
        {
          title: "Option 1",
          items: [
            "5 oz chicken breast or thighs (skinless)",
            "1 small baked potato or 1 cup roasted carrots",
            "1–2 cups mixed greens with light vinaigrette"
          ]
        },
        {
          title: "Option 2",
          items: [
            "5 oz sirloin steak or lean ground beef",
            "1 cup cauliflower mash or spaghetti squash",
            "1–2 cups spinach or kale sautéed in olive oil"
          ]
        }
      ]
    }
  ];

  const supplementGuide = [
    {
      supplement: "Vitamin D3",
      timing: "Daily with meal",
      benefits: "Bone health, immune support, mood regulation",
      dosage: "1000-2000 IU (consult doctor)",
      color: "from-yellow-100 to-amber-100",
      icon: "☀️"
    },
    {
      supplement: "Omega-3 (DHA/EPA)",
      timing: "With meals to reduce fishy taste",
      benefits: "Brain health, reduces inflammation, supports mood",
      dosage: "500-1000mg combined DHA/EPA",
      color: "from-blue-100 to-indigo-100",
      icon: "🐟"
    },
    {
      supplement: "Probiotics",
      timing: "Morning on empty stomach",
      benefits: "Digestive health, immune support, may help with mood",
      dosage: "10-50 billion CFU multi-strain",
      color: "from-green-100 to-teal-100",
      icon: "🦠"
    },
    {
      supplement: "Magnesium",
      timing: "Evening before bed",
      benefits: "Muscle recovery, sleep quality, stress management",
      dosage: "200-400mg magnesium glycinate",
      color: "from-purple-100 to-violet-100",
      icon: "🌙"
    }
  ];

  // Initialize exercise data structure
  useEffect(() => {
    const initData = {};
    workoutPlan.forEach(day => {
      day.exercises.forEach(exercise => {
        const key = `${day.day}-${exercise}`;
        if (!exerciseData[key]) {
          initData[key] = {
            sets: [],
            completed: false
          };
        }
      });
    });
    if (Object.keys(initData).length > 0) {
      setExerciseData(prev => ({ ...prev, ...initData }));
    }
  }, []);

  // Check if it's a new day and reset nutrition & supplement goals
  useEffect(() => {
    const today = new Date().toDateString();
    if (lastResetDate !== today) {
      setCompletedNutrition([]); // Reset nutrition goals
      setCompletedSupplements([]); // Reset supplement goals
      setLastResetDate(today);
    }
  }, [lastResetDate]);

  // Toggle functions
  const toggleWorkoutCompletion = (id) => {
    setCompletedWorkouts(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleNutritionCompletion = (id) => {
    setCompletedNutrition(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleSupplementCompletion = (id) => {
    setCompletedSupplements(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Add set to exercise
  const addSet = (exerciseKey, weight = '', reps = '') => {
    setExerciseData(prev => ({
      ...prev,
      [exerciseKey]: {
        ...prev[exerciseKey],
        sets: [...(prev[exerciseKey]?.sets || []), { weight, reps, id: Date.now() }]
      }
    }));
  };

  // Update set
  const updateSet = (exerciseKey, setId, field, value) => {
    setExerciseData(prev => ({
      ...prev,
      [exerciseKey]: {
        ...prev[exerciseKey],
        sets: prev[exerciseKey].sets.map(set => 
          set.id === setId ? { ...set, [field]: value } : set
        )
      }
    }));
  };

  // Remove set
  const removeSet = (exerciseKey, setId) => {
    setExerciseData(prev => ({
      ...prev,
      [exerciseKey]: {
        ...prev[exerciseKey],
        sets: prev[exerciseKey].sets.filter(set => set.id !== setId)
      }
    }));
  };

  // Mark exercise as completed
  const completeExercise = (exerciseKey) => {
    setExerciseData(prev => ({
      ...prev,
      [exerciseKey]: {
        ...prev[exerciseKey],
        completed: true
      }
    }));
    setSelectedExercise(null);
  };

  const renderWorkouts = () => (
    <div className="space-y-4 pb-20">
      <div className="text-center mb-6 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Workout Plan (3–4 Days/Week)</h2>
        <p className="text-gray-600 text-sm leading-relaxed">Knee-friendly exercises focused on building strength and muscle tone</p>
      </div>

      <div className="mx-4 bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-2xl border border-pink-200 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-pink-100 p-2 rounded-full">
            <Heart className="h-4 w-4 text-pink-600" />
          </div>
          <h3 className="font-semibold text-gray-800 text-sm">Remember</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          Always warm up before each session and listen to your body. Rest 1-2 days between workout days.
        </p>
      </div>

      <div className="space-y-4 px-4">
        {workoutPlan.map((day, dayIndex) => (
          <div key={day.day} className={`bg-gradient-to-r ${day.color} rounded-2xl p-4 shadow-sm border border-white`}>
            <div className="mb-3">
              <h3 className="font-bold text-gray-800 text-lg">{day.day}</h3>
              <p className="text-sm text-gray-700 mt-1">{day.focus}</p>
            </div>

            <div className="bg-white bg-opacity-80 rounded-xl p-3 border border-white">
              <div className="space-y-2">
                {day.exercises.map((exercise, exerciseIndex) => {
                  const exerciseKey = `${day.day}-${exercise}`;
                  const isCompleted = exerciseData[exerciseKey]?.completed;
                  const setsCount = exerciseData[exerciseKey]?.sets?.length || 0;
                  
                  return (
                    <button 
                      key={exercise}
                      onClick={() => setSelectedExercise(exerciseKey)}
                      className={`w-full p-4 rounded-xl border transition-all ${
                        isCompleted 
                          ? 'bg-green-50 border-green-200 shadow-sm' 
                          : 'bg-white border-gray-200 hover:bg-pink-50 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium text-left ${isCompleted ? 'text-green-800' : 'text-gray-700'}`}>
                          {exercise}
                        </span>
                        <div className="flex items-center space-x-2">
                          {setsCount > 0 && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                              {setsCount} sets
                            </span>
                          )}
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNutrition = () => (
    <div className="space-y-4 pb-20">
      <div className="text-center mb-6 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Nutrition Plan</h2>
        <p className="text-gray-600 text-sm leading-relaxed">Support muscle growth, keep body fat in check, high protein, nutrient-rich</p>
      </div>

      <div className="mx-4 bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-2xl border border-green-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Apple className="h-4 w-4 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Today's Nutrition Goals</h3>
          </div>
          <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
            Resets daily
          </span>
        </div>
        <div className="space-y-2">
          {dailyGoals.map((goal, index) => (
            <div key={goal} className="bg-white bg-opacity-80 rounded-xl p-3 border border-white">
              <button
                onClick={() => toggleNutritionCompletion(`daily-goal-${index}`)}
                className="flex items-center space-x-3 w-full"
              >
                <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  completedNutrition.includes(`daily-goal-${index}`)
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300 bg-white'
                }`}>
                  {completedNutrition.includes(`daily-goal-${index}`) && (
                    <CheckCircle className="h-4 w-4 text-white" />
                  )}
                </div>
                <span className={`text-sm text-left font-medium ${
                  completedNutrition.includes(`daily-goal-${index}`)
                    ? 'line-through text-gray-500'
                    : 'text-gray-700'
                }`}>
                  {goal}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 px-4">
        {nutritionPlan.map((meal, mealIndex) => (
          <div key={meal.category} className={`bg-gradient-to-r ${meal.color} rounded-2xl p-4 shadow-sm border border-white`}>
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl">{meal.icon}</span>
              <h3 className="font-bold text-gray-800 text-lg">{meal.category}</h3>
            </div>
            <div className="space-y-3">
              {meal.options.map((option, optionIndex) => (
                <div key={option.title} className="bg-white bg-opacity-80 rounded-xl p-3 border border-white">
                  <h4 className="font-semibold text-gray-700 text-sm mb-2">{option.title}</h4>
                  <div className="space-y-1">
                    {option.items.map((item, itemIndex) => (
                      <p key={itemIndex} className="text-xs text-gray-600 leading-relaxed">• {item}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSupplements = () => (
    <div className="space-y-4 pb-20">
      <div className="text-center mb-6 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Supplement Support</h2>
        <p className="text-gray-600 text-sm leading-relaxed">Evidence-based supplements to consider for postpartum wellness</p>
      </div>

      <div className="mx-4 bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-2xl border border-amber-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-amber-100 p-2 rounded-full">
            <Target className="h-4 w-4 text-amber-600" />
          </div>
          <h3 className="font-semibold text-gray-800 text-sm">Today's Supplements</h3>
        </div>
        <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-full">
          Resets daily
        </span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          Always consult your healthcare provider before starting any new supplements, especially while breastfeeding.
        </p>
      </div>

      <div className="space-y-4 px-4">
        {supplementGuide.map((supplement, index) => (
          <div key={supplement.supplement} className={`bg-gradient-to-r ${supplement.color} rounded-2xl p-4 shadow-sm border border-white`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{supplement.icon}</span>
                  <h3 className="font-bold text-gray-800 text-lg">{supplement.supplement}</h3>
                </div>
                <div className="bg-white bg-opacity-80 rounded-xl p-3 border border-white mb-3">
                  <p className="text-sm text-gray-700 mb-2 leading-relaxed">{supplement.benefits}</p>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold">Timing:</span> {supplement.timing}
                    </p>
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold">Dosage:</span> {supplement.dosage}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleSupplementCompletion(index)}
              className={`w-full p-3 rounded-xl border-2 transition-all ${
                completedSupplements.includes(index)
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {completedSupplements.includes(index) ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Tracked</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    <span className="font-medium">Track</span>
                  </>
                )}
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-4 pb-20">
      <div className="text-center mb-6 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Progress</h2>
        <p className="text-gray-600 text-sm leading-relaxed">Track your journey and celebrate every milestone</p>
      </div>

      <div className="grid grid-cols-1 gap-4 px-4">
        <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-4 shadow-sm border border-pink-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-pink-100 p-3 rounded-full">
              <Dumbbell className="h-6 w-6 text-pink-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Workouts</h3>
              <p className="text-xs text-gray-600">Exercises completed</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-pink-600">{Object.values(exerciseData).filter(ex => ex.completed).length}</p>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 shadow-sm border border-green-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-green-100 p-3 rounded-full">
              <Apple className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Nutrition</h3>
              <p className="text-xs text-gray-600">Goals achieved</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-green-600">{completedNutrition.length}</p>
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-4 shadow-sm border border-blue-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Supplements</h3>
              <p className="text-xs text-gray-600">Items tracked</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-600">{completedSupplements.length}</p>
        </div>
      </div>

      <div className="mx-4 bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl border border-purple-200 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-purple-100 p-2 rounded-full">
            <Star className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-800">Daily Motivation</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-white bg-opacity-80 rounded-xl p-3 border border-white">
            <p className="text-sm text-gray-700 italic leading-relaxed">
              "Your body grew and delivered a miracle. Be patient and kind to yourself as you heal and grow stronger."
            </p>
          </div>
          <div className="bg-white bg-opacity-80 rounded-xl p-3 border border-white">
            <p className="text-sm text-gray-700 italic leading-relaxed">
              "Every small step forward is progress. Celebrate your journey, not just the destination."
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* iPhone-specific safe area and header - VIBRANT GREEN */}
      <div className="bg-gradient-to-r from-emerald-100 to-teal-100 bg-opacity-95 shadow-lg border-b border-emerald-200 sticky top-0 z-50">
        {/* iPhone notch safe area */}
        <div className="h-11"></div>
        <div className="px-4 pb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2.5 rounded-2xl shadow-lg">
              <Baby className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-emerald-800">Postpartum Wellness</h1>
              <p className="text-sm text-emerald-600">Your journey to strength & vitality</p>
            </div>
          </div>
        </div>
      </div>

      {/* iPhone-optimized Navigation Tabs - VIBRANT PASTELS */}
      <div className="bg-gradient-to-r from-pink-100 via-green-100 via-blue-100 to-purple-100 border-b border-gray-300 sticky top-[108px] z-40 shadow-sm">
        <div className="px-2 py-1">
          <div className="flex justify-between gap-1">
            {[
              { id: 'workouts', label: 'Workouts', icon: Dumbbell, colors: { bg: 'bg-pink-200', text: 'text-pink-800', active: 'bg-pink-300', indicator: 'bg-pink-600', shadow: 'shadow-pink-200' } },
              { id: 'nutrition', label: 'Nutrition', icon: Apple, colors: { bg: 'bg-green-200', text: 'text-green-800', active: 'bg-green-300', indicator: 'bg-green-600', shadow: 'shadow-green-200' } },
              { id: 'supplements', label: 'Vitamins', icon: Target, colors: { bg: 'bg-blue-200', text: 'text-blue-800', active: 'bg-blue-300', indicator: 'bg-blue-600', shadow: 'shadow-blue-200' } },
              { id: 'progress', label: 'Progress', icon: Star, colors: { bg: 'bg-purple-200', text: 'text-purple-800', active: 'bg-purple-300', indicator: 'bg-purple-600', shadow: 'shadow-purple-200' } }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center py-3 px-2 rounded-2xl transition-all relative ${
                    isActive
                      ? `${tab.colors.text} ${tab.colors.active} shadow-lg ${tab.colors.shadow}`
                      : `text-gray-700 ${tab.colors.bg} hover:${tab.colors.active} shadow-md`
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-bold">{tab.label}</span>
                  {isActive && <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1.5 ${tab.colors.indicator} rounded-full`}></div>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content with iPhone bottom safe area */}
      <div className="pt-2">
        {activeTab === 'workouts' && renderWorkouts()}
        {activeTab === 'nutrition' && renderNutrition()}
        {activeTab === 'supplements' && renderSupplements()}
        {activeTab === 'progress' && renderProgress()}
      </div>

      {/* iPhone bottom safe area */}
      <div className="h-8 bg-gradient-to-t from-white to-transparent"></div>

      {/* Exercise Details Modal - iPhone optimized */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full max-h-[85vh] overflow-hidden">
            {/* Modal header */}
            <div className="sticky top-0 bg-white bg-opacity-95 p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800 pr-4 leading-tight">
                  {selectedExercise.split('-').slice(2).join('-')}
                </h3>
                <button
                  onClick={() => setSelectedExercise(null)}
                  className="bg-gray-100 p-2 rounded-full"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-4 overflow-y-auto">
              {/* Current Sets */}
              <div className="space-y-3 mb-4">
                {exerciseData[selectedExercise]?.sets?.map((set, index) => (
                  <div key={set.id} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600 w-12">
                      Set {index + 1}
                    </span>
                    <input
                      type="number"
                      placeholder="Weight"
                      value={set.weight}
                      onChange={(e) => updateSet(selectedExercise, set.id, 'weight', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                    <span className="text-xs text-gray-500">lbs</span>
                    <input
                      type="number"
                      placeholder="Reps"
                      value={set.reps}
                      onChange={(e) => updateSet(selectedExercise, set.id, 'reps', e.target.value)}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                    <span className="text-xs text-gray-500">reps</span>
                    <button
                      onClick={() => removeSet(selectedExercise, set.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Set Button */}
              <button
                onClick={() => addSet(selectedExercise)}
                className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Set</span>
              </button>

              {/* Complete Exercise Button */}
              <button
                onClick={() => completeExercise(selectedExercise)}
                disabled={!exerciseData[selectedExercise]?.sets?.length}
                className={`w-full px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                  exerciseData[selectedExercise]?.sets?.length
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle className="h-4 w-4" />
                <span>Complete Exercise</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostpartumFitnessApp;