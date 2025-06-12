import React, { useState, useEffect } from 'react';
import { ChevronRight, Heart, Calendar, Apple, Dumbbell, Target, CheckCircle, Plus, Star, Baby, X } from 'lucide-react';

const PostpartumFitnessApp = () => {
  const [activeTab, setActiveTab] = useState('workouts');
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [completedNutrition, setCompletedNutrition] = useState([]);
  const [completedSupplements, setCompletedSupplements] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseData, setExerciseData] = useState({});

  // Data structures
  const workoutPlan = [
    {
      week: "Week 1-2: Foundation",
      color: "from-rose-200 to-pink-200",
      workouts: [
        {
          day: "Day 1: Core Activation",
          exercises: [
            "Deep Breathing (5 minutes)",
            "Pelvic Tilts (10 reps)",
            "Modified Cat-Cow (10 reps)",
            "Wall Sits (3 x 15 seconds)",
            "Gentle Stretching (10 minutes)"
          ]
        },
        {
          day: "Day 2: Gentle Movement",
          exercises: [
            "Walking (15-20 minutes)",
            "Arm Circles (10 each direction)",
            "Shoulder Blade Squeezes (10 reps)",
            "Seated Spinal Twists (5 each side)",
            "Relaxation (5 minutes)"
          ]
        },
        {
          day: "Day 3: Rest or Light Stretching",
          exercises: [
            "Gentle Yoga Flow (15 minutes)",
            "Neck Stretches (5 minutes)",
            "Deep Breathing Exercises"
          ]
        }
      ]
    },
    {
      week: "Week 3-4: Building Strength",
      color: "from-purple-200 to-indigo-200",
      workouts: [
        {
          day: "Day 1: Core & Stability",
          exercises: [
            "Modified Plank (3 x 20 seconds)",
            "Dead Bug (3 x 8 each side)",
            "Bird Dog (3 x 8 each side)",
            "Glute Bridges (3 x 12)",
            "Standing Marches (3 x 10 each leg)"
          ]
        },
        {
          day: "Day 2: Cardio & Mobility",
          exercises: [
            "Brisk Walking (25 minutes)",
            "Arm Swings (15 each direction)",
            "Hip Circles (10 each direction)",
            "Calf Raises (3 x 15)",
            "Cool Down Stretches (10 minutes)"
          ]
        },
        {
          day: "Day 3: Full Body Gentle",
          exercises: [
            "Bodyweight Squats (3 x 10)",
            "Wall Push-ups (3 x 8)",
            "Standing Side Bends (10 each side)",
            "Heel-to-Toe Walk (2 minutes)",
            "Relaxation Poses (10 minutes)"
          ]
        }
      ]
    },
    {
      week: "Week 5-6: Progressive Training",
      color: "from-teal-200 to-cyan-200",
      workouts: [
        {
          day: "Day 1: Strength Focus",
          exercises: [
            "Squats (3 x 12-15)",
            "Modified Push-ups (3 x 8-10)",
            "Lunges (3 x 8 each leg)",
            "Plank Hold (3 x 30 seconds)",
            "Russian Twists (3 x 15)"
          ]
        },
        {
          day: "Day 2: Cardio Interval",
          exercises: [
            "Walking Intervals (30 minutes)",
            "Step-ups (3 x 10 each leg)",
            "Jumping Jacks (3 x 15)",
            "Mountain Climbers (3 x 10)",
            "Stretching Routine (15 minutes)"
          ]
        },
        {
          day: "Day 3: Functional Movement",
          exercises: [
            "Deadlifts (bodyweight, 3 x 10)",
            "Push-up to T (3 x 6 each side)",
            "Single-leg Balance (3 x 30 seconds each)",
            "Bear Crawl (3 x 30 seconds)",
            "Yoga Flow (15 minutes)"
          ]
        }
      ]
    }
  ];

  const nutritionPlan = [
    {
      category: "Morning Boost",
      icon: "☀️",
      color: "from-amber-100 to-yellow-100",
      items: [
        "Warm lemon water upon waking",
        "Protein-rich breakfast within 1 hour",
        "Include complex carbohydrates",
        "Add healthy fats (avocado, nuts)"
      ]
    },
    {
      category: "Hydration Goals",
      icon: "💧",
      color: "from-blue-100 to-cyan-100",
      items: [
        "Aim for 8-10 glasses of water daily",
        "Herbal teas count toward fluid intake",
        "Coconut water for natural electrolytes",
        "Monitor urine color for hydration status"
      ]
    },
    {
      category: "Energy Snacks",
      icon: "🥜",
      color: "from-green-100 to-emerald-100",
      items: [
        "Greek yogurt with berries",
        "Apple slices with almond butter",
        "Hummus with veggie sticks",
        "Trail mix with nuts and seeds"
      ]
    },
    {
      category: "Recovery Meals",
      icon: "🍽️",
      color: "from-orange-100 to-pink-100",
      items: [
        "Lean protein with each meal",
        "Anti-inflammatory foods (turmeric, ginger)",
        "Iron-rich foods (spinach, lean meats)",
        "Omega-3 sources (salmon, walnuts)"
      ]
    }
  ];

  const supplementGuide = [
    {
      supplement: "Prenatal Vitamin",
      timing: "Continue for 3-6 months postpartum",
      benefits: "Supports nutrient needs during recovery and breastfeeding",
      dosage: "As directed by healthcare provider",
      color: "from-pink-100 to-rose-100",
      icon: "💊"
    },
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
      supplement: "Iron (if deficient)",
      timing: "Between meals with vitamin C",
      benefits: "Energy levels, prevents anemia",
      dosage: "Only if blood work shows deficiency",
      color: "from-red-100 to-pink-100",
      icon: "🩸"
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
    workoutPlan.forEach(week => {
      week.workouts.forEach(workout => {
        workout.exercises.forEach(exercise => {
          const key = `${week.week}-${workout.day}-${exercise}`;
          if (!exerciseData[key]) {
            initData[key] = {
              sets: [],
              completed: false
            };
          }
        });
      });
    });
    if (Object.keys(initData).length > 0) {
      setExerciseData(prev => ({ ...prev, ...initData }));
    }
  }, []);

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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Fitness Journey</h2>
        <p className="text-gray-600 text-sm leading-relaxed">Gentle, progressive workouts designed for postpartum recovery</p>
      </div>

      <div className="mx-4 bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-2xl border border-pink-100 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-pink-100 p-2 rounded-full">
            <Heart className="h-4 w-4 text-pink-600" />
          </div>
          <h3 className="font-semibold text-gray-800 text-sm">Remember</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          Listen to your body, start slowly, and consult your healthcare provider before beginning any exercise program.
        </p>
      </div>

      <div className="space-y-4 px-4">
        {workoutPlan.map((week, weekIndex) => (
          <div key={week.week} className={`bg-gradient-to-r ${week.color} rounded-2xl p-4 shadow-sm border border-white`}>
            <h3 className="font-bold text-gray-800 mb-3 text-lg">{week.week}</h3>
            <div className="space-y-3">
              {week.workouts.map((workout, workoutIndex) => (
                <div key={workout.day} className="bg-white bg-opacity-80 rounded-xl p-3 border border-white">
                  <h4 className="font-semibold text-gray-700 mb-3 text-sm">{workout.day}</h4>
                  <div className="space-y-2">
                    {workout.exercises.map((exercise, exerciseIndex) => {
                      const exerciseKey = `${week.week}-${workout.day}-${exercise}`;
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
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNutrition = () => (
    <div className="space-y-4 pb-20">
      <div className="text-center mb-6 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Nourish Your Recovery</h2>
        <p className="text-gray-600 text-sm leading-relaxed">Nutrition guidelines to support your healing and energy</p>
      </div>

      <div className="mx-4 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-100 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-green-100 p-2 rounded-full">
            <Apple className="h-4 w-4 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-800 text-sm">Focus Areas</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          Prioritize nutrient-dense foods, stay hydrated, and maintain steady energy levels throughout the day.
        </p>
      </div>

      <div className="space-y-4 px-4">
        {nutritionPlan.map((category, categoryIndex) => (
          <div key={category.category} className={`bg-gradient-to-r ${category.color} rounded-2xl p-4 shadow-sm border border-white`}>
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl">{category.icon}</span>
              <h3 className="font-bold text-gray-800 text-lg">{category.category}</h3>
            </div>
            <div className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <div 
                  key={item}
                  className="bg-white bg-opacity-80 rounded-xl p-3 border border-white"
                >
                  <button
                    onClick={() => toggleNutritionCompletion(`${categoryIndex}-${itemIndex}`)}
                    className="flex items-center space-x-3 w-full"
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      completedNutrition.includes(`${categoryIndex}-${itemIndex}`)
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300 bg-white'
                    }`}>
                      {completedNutrition.includes(`${categoryIndex}-${itemIndex}`) && (
                        <CheckCircle className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span className={`text-sm text-left ${
                      completedNutrition.includes(`${categoryIndex}-${itemIndex}`)
                        ? 'line-through text-gray-500'
                        : 'text-gray-700'
                    }`}>
                      {item}
                    </span>
                  </button>
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

      <div className="mx-4 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-100 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-amber-100 p-2 rounded-full">
            <Target className="h-4 w-4 text-amber-600" />
          </div>
          <h3 className="font-semibold text-gray-800 text-sm">Important Note</h3>
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
    {/* iPhone-specific safe area and header */}
      <div className="bg-gradient-to-r from-cyan-100 to-teal-100 bg-opacity-95 shadow-lg border-b border-cyan-200 sticky top-0 z-50">
      {/* iPhone notch safe area */}
        <div className="h-11"></div>
          <div className="px-4 pb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-2.5 rounded-2xl shadow-lg">
                <Baby className="h-6 w-6 text-white" />
              </div>
            <div>
            <h1 className="text-xl font-bold text-cyan-800">Postpartum Wellness</h1>
            <p className="text-sm text-cyan-600">Your journey to strength & vitality</p>
          </div>
        </div>
      </div>
    </div>

      {/* iPhone-optimized Navigation Tabs */}
      <div className="bg-white bg-opacity-95 border-b border-gray-100 sticky top-16 z-40">
        <div className="px-2">
          <div className="flex justify-between">
            {[
              { id: 'workouts', label: 'Workouts', icon: Dumbbell, color: 'pink' },
              { id: 'nutrition', label: 'Nutrition', icon: Apple, color: 'green' },
              { id: 'supplements', label: 'Vitamins', icon: Target, color: 'blue' },
              { id: 'progress', label: 'Progress', icon: Star, color: 'purple' }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center py-3 px-2 transition-all relative ${
                    isActive
                      ? 'text-pink-600 bg-pink-50'
                      : 'text-gray-600'
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">{tab.label}</span>
                  {isActive && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-pink-500 rounded-full"></div>}
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
