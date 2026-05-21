<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Models\Sport;
use App\Models\Equipe;
use App\Models\User;
use App\Models\Seance;
use App\Models\Critere;

/*
|--------------------------------------------------------------------------
| Routes Publiques
|--------------------------------------------------------------------------
*/
Route::get('/ziggy', function () {
    return response()->json(new \Tighten\Ziggy\Ziggy('web'));
});

Route::get('/', function () {
    return Inertia::render('Public/Home', [
        'sports' => Sport::all(),
        'equipes' => Equipe::with(['coach', 'sport', 'athletes'])->get()->map(function ($equipe) {
            return [
                'id' => $equipe->id,
                'nom' => $equipe->name,
                'coach' => $equipe->coach->name,
                'joueurs' => $equipe->athletes->count(),
                'sport' => $equipe->sport->name,
            ];
        }),
        'stats' => [
            'membres' => User::where('role', 'athlete')->count(),
            'coachs' => User::where('role', 'coach')->count(),
            'sports' => Sport::count(),
            'seances' => Seance::count(),
        ],
    ]);
})->name('home');

/*
|--------------------------------------------------------------------------
| Login / Register
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store']);
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

/*
|--------------------------------------------------------------------------
| ROUTES ADMIN
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    
    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/Admin/Overview', [
            'stats' => [
                'athletes' => User::where('role', 'athlete')->count(),
                'coachs' => User::where('role', 'coach')->count(),
                'sports' => Sport::count(),
                'equipes' => Equipe::count(),
                'seances' => Seance::count(),
            ],
            'derniersInscrits' => User::latest()->take(5)->get(),
        ]);
    })->name('dashboard');

    // GESTION DES COACHS
    Route::get('/coachs', function () {
        $coachs = User::where('role', 'coach')->with('equipes.sport')->get();
        return Inertia::render('Dashboard/Admin/Coachs/Index', ['coachs' => $coachs]);
    })->name('coachs.index');
    
    Route::get('/coachs/create', function () {
        $sports = Sport::all();
        return Inertia::render('Dashboard/Admin/Coachs/Create', ['sports' => $sports]);
    })->name('coachs.create');
    
    Route::post('/coachs', function (Request $request) {
        $request->validate([
            'name' => 'required|string|max:255', 'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8', 'speciality' => 'nullable|string',
            'experience' => 'nullable|integer', 'bio' => 'nullable|string',
            'certification' => 'nullable|string', 'phone' => 'nullable|string',
        ]);
        User::create([
            'name' => $request->name, 'email' => $request->email,
            'password' => Hash::make($request->password), 'role' => 'coach',
            'speciality' => $request->speciality, 'experience' => $request->experience,
            'bio' => $request->bio, 'certification' => $request->certification,
            'phone' => $request->phone,
        ]);
        return redirect()->route('admin.coachs.index')->with('success', 'Coach créé avec succès !');
    })->name('coachs.store');
    
    Route::get('/coachs/{user}/edit', function (User $user) {
        $sports = Sport::all();
        return Inertia::render('Dashboard/Admin/Coachs/Edit', ['coach' => $user, 'sports' => $sports]);
    })->name('coachs.edit');
    
    Route::put('/coachs/{user}', function (Request $request, User $user) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8', 'speciality' => 'nullable|string',
            'experience' => 'nullable|integer', 'bio' => 'nullable|string',
            'certification' => 'nullable|string', 'phone' => 'nullable|string',
        ]);
        $data = $request->only(['name', 'email', 'speciality', 'experience', 'bio', 'certification', 'phone']);
        if ($request->password) { $data['password'] = Hash::make($request->password); }
        $user->update($data);
        return redirect()->route('admin.coachs.index')->with('success', 'Coach mis à jour !');
    })->name('coachs.update');
    
    Route::delete('/coachs/{user}', function (User $user) {
        $user->delete();
        return redirect()->route('admin.coachs.index')->with('success', 'Coach supprimé !');
    })->name('coachs.destroy');

    // GESTION DES ATHLÈTES
    Route::get('/athletes', function () {
        $athletes = User::where('role', 'athlete')->with('equipesAthlete')->get()->map(function ($athlete) {
            return [
                'id' => $athlete->id, 'name' => $athlete->name, 'email' => $athlete->email,
                'age' => $athlete->age, 'level' => $athlete->level, 'phone' => $athlete->phone,
                'equipes' => $athlete->equipesAthlete->pluck('name')->join(', '),
                'equipes_count' => $athlete->equipesAthlete->count(),
            ];
        });
        return Inertia::render('Dashboard/Admin/Athletes/Index', ['athletes' => $athletes]);
    })->name('athletes.index');
    
    Route::get('/athletes/create', function () {
        return Inertia::render('Dashboard/Admin/Athletes/Create');
    })->name('athletes.create');
    
    Route::post('/athletes', function (Request $request) {
        $request->validate([
            'name' => 'required|string|max:255', 'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8', 'age' => 'nullable|integer',
            'level' => 'nullable|string', 'phone' => 'nullable|string',
        ]);
        User::create([
            'name' => $request->name, 'email' => $request->email,
            'password' => Hash::make($request->password), 'role' => 'athlete',
            'age' => $request->age, 'level' => $request->level, 'phone' => $request->phone,
        ]);
        return redirect()->route('admin.athletes.index')->with('success', 'Athlète créé !');
    })->name('athletes.store');
    
    Route::get('/athletes/{user}/edit', function (User $user) {
        return Inertia::render('Dashboard/Admin/Athletes/Edit', ['athlete' => $user]);
    })->name('athletes.edit');
    
    Route::put('/athletes/{user}', function (Request $request, User $user) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8', 'age' => 'nullable|integer',
            'level' => 'nullable|string', 'phone' => 'nullable|string',
        ]);
        $data = $request->only(['name', 'email', 'age', 'level', 'phone']);
        if ($request->password) { $data['password'] = Hash::make($request->password); }
        $user->update($data);
        return redirect()->route('admin.athletes.index')->with('success', 'Athlète mis à jour !');
    })->name('athletes.update');
    
    Route::delete('/athletes/{user}', function (User $user) {
        $user->delete();
        return redirect()->route('admin.athletes.index')->with('success', 'Athlète supprimé !');
    })->name('athletes.destroy');

    // GESTION DES ÉQUIPES
    Route::get('/equipes', function () {
        $equipes = Equipe::with(['coach', 'sport', 'athletes'])->get();
        $coachs = User::where('role', 'coach')->get();
        $sports = Sport::all();
        $athletes = User::where('role', 'athlete')->get();
        return Inertia::render('Dashboard/Admin/Equipes/Index', [
            'equipes' => $equipes, 'coachs' => $coachs, 'sports' => $sports, 'athletes' => $athletes,
        ]);
    })->name('equipes.index');
    
    Route::post('/equipes', function (Request $request) {
        $request->validate(['name' => 'required', 'sport_id' => 'required', 'coach_id' => 'required']);
        Equipe::create($request->only(['name', 'sport_id', 'coach_id']));
        return back()->with('success', 'Équipe créée !');
    })->name('equipes.store');
    
    Route::put('/equipes/{equipe}', function (Request $request, Equipe $equipe) {
        $request->validate(['name' => 'required', 'sport_id' => 'required', 'coach_id' => 'required']);
        $equipe->update($request->only(['name', 'sport_id', 'coach_id']));
        return back()->with('success', 'Équipe mise à jour !');
    })->name('equipes.update');
    
    Route::delete('/equipes/{equipe}', function (Equipe $equipe) {
        $equipe->delete();
        return back()->with('success', 'Équipe supprimée !');
    })->name('equipes.destroy');
    
    Route::post('/equipes/{equipe}/add-athlete', function (Request $request, Equipe $equipe) {
        $request->validate(['athlete_id' => 'required']);
        if (!$equipe->athletes()->where('athlete_id', $request->athlete_id)->exists()) {
            $equipe->athletes()->attach($request->athlete_id);
            return back()->with('success', 'Athlète ajouté !');
        }
        return back()->with('error', 'Déjà dans l\'équipe.');
    })->name('equipes.add-athlete');
    
    Route::delete('/equipes/{equipe}/remove-athlete/{athlete}', function (Equipe $equipe, $athlete) {
        $equipe->athletes()->detach($athlete);
        return back()->with('success', 'Athlète retiré !');
    })->name('equipes.remove-athlete');

    // GESTION DES SPORTS
    Route::get('/sports', function () {
        $sports = Sport::withCount('equipes')->get();
        return Inertia::render('Dashboard/Admin/Sports/Index', ['sports' => $sports]);
    })->name('sports.index');
    
    Route::post('/sports', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'image' => 'nullable|string|max:255',
    ]);
    Sport::create($request->only(['name', 'description', 'image']));
    return back()->with('success', 'Sport créé !');
})->name('sports.store');

Route::post('/sports/upload-image', function (Request $request) {
    $request->validate([
        'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    $file = $request->file('image');
    $filename = time() . '_' . $file->getClientOriginalName();
    $file->move(public_path('images'), $filename);

    return response()->json(['path' => '/images/' . $filename]);
})->name('sports.upload-image');

Route::put('/sports/{sport}', function (Request $request, Sport $sport) {
    $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'image' => 'nullable|string|max:255',
    ]);
    $sport->update($request->only(['name', 'description', 'image']));
    return back()->with('success', 'Sport mis à jour !');
})->name('sports.update');
    
    Route::delete('/sports/{sport}', function (Sport $sport) {
        $sport->delete();
        return back()->with('success', 'Sport supprimé !');
    })->name('sports.destroy');
    // GESTION DES CRITÈRES
    Route::get('/sports/{sport}/criteres', function (Sport $sport) {
        $criteres = $sport->criteres;
        return Inertia::render('Dashboard/Admin/Sports/Criteres', [
            'sport' => $sport,
            'criteres' => $criteres,
        ]);
    })->name('sports.criteres');

    Route::post('/sports/{sport}/criteres', function (Request $request, Sport $sport) {
        $request->validate(['nom' => 'required|string|max:255']);
        $sport->criteres()->create(['nom' => $request->nom]);
        return back()->with('success', 'Critère ajouté !');
    })->name('criteres.store');

    Route::put('/criteres/{critere}', function (Request $request, Critere $critere) {
        $request->validate(['nom' => 'required|string|max:255']);
        $critere->update(['nom' => $request->nom]);
        return back()->with('success', 'Critère mis à jour !');
    })->name('criteres.update');

    Route::delete('/criteres/{critere}', function (Critere $critere) {
        $critere->delete();
        return back()->with('success', 'Critère supprimé !');
    })->name('criteres.destroy');
        // ==========================================
    // GESTION DES SÉANCES
    // ==========================================
    
    Route::get('/seances', function () {
        $seances = Seance::with(['equipe', 'coach', 'sport'])->orderBy('date', 'desc')->get();
        $equipes = Equipe::all();
        return Inertia::render('Dashboard/Admin/Seances/Index', ['seances' => $seances, 'equipes' => $equipes]);
    })->name('seances.index');
    
    Route::post('/seances', function (Request $request) {
        $request->validate([
            'equipe_id' => 'required|exists:equipes,id',
            'date' => 'required|date',
            'heure_debut' => 'required',
            'heure_fin' => 'required',
            'lieu' => 'nullable|string',
        ]);
        
        $equipe = Equipe::find($request->equipe_id);
        
        Seance::create([
            'equipe_id' => $request->equipe_id,
            'sport_id' => $equipe->sport_id,
            'coach_id' => $equipe->coach_id,
            'date' => $request->date,
            'heure_debut' => $request->heure_debut,
            'heure_fin' => $request->heure_fin,
            'lieu' => $request->lieu,
        ]);
        
        return back()->with('success', 'Séance créée !');
    })->name('seances.store');
    
    Route::put('/seances/{seance}', function (Request $request, Seance $seance) {
        $request->validate([
            'equipe_id' => 'required|exists:equipes,id',
            'date' => 'required|date',
            'heure_debut' => 'required',
            'heure_fin' => 'required',
            'lieu' => 'nullable|string',
        ]);
        
        $equipe = Equipe::find($request->equipe_id);
        
        $seance->update([
            'equipe_id' => $request->equipe_id,
            'sport_id' => $equipe->sport_id,
            'coach_id' => $equipe->coach_id,
            'date' => $request->date,
            'heure_debut' => $request->heure_debut,
            'heure_fin' => $request->heure_fin,
            'lieu' => $request->lieu,
        ]);
        
        return back()->with('success', 'Séance mise à jour !');
    })->name('seances.update');
    
    Route::delete('/seances/{seance}', function (Seance $seance) {
        $seance->delete();
        return back()->with('success', 'Séance supprimée !');
    })->name('seances.destroy');
    // PARAMÈTRES
Route::get('/parametres', function () {
    return Inertia::render('Dashboard/Admin/Parametres', [
        'admin' => auth()->user(),
    ]);
})->name('parametres');

Route::put('/parametres/profil', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . auth()->id(),
        'phone' => 'nullable|string|max:20',
    ]);
    
    auth()->user()->update($request->only(['name', 'email', 'phone']));
    
    return back()->with('success', 'Profil mis à jour !');
})->name('parametres.profil');

Route::put('/parametres/password', function (Request $request) {
    $request->validate([
        'current_password' => 'required|current_password',
        'password' => 'required|string|min:8|confirmed',
    ]);
    
    auth()->user()->update([
        'password' => Hash::make($request->password),
    ]);
    
    return back()->with('success', 'Mot de passe changé !');
})->name('parametres.password');

}); // FIN DU GROUPE ADMIN

// Dashboards Coach et Athlete
Route::middleware(['auth'])->group(function () {
    Route::get('/coach/dashboard', function () {
        return Inertia::render('Dashboard/Coach/Overview');
    })->name('coach.dashboard');
    
    Route::get('/athlete/dashboard', function () {
        return Inertia::render('Dashboard/Athlete/Overview');
    })->name('athlete.dashboard');
});

require __DIR__.'/auth.php';