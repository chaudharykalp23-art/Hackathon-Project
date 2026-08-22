import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import api from "./api";

const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);

const demoTrips = [
  {
    id: 1,
    name: "Alpine Adventure",
    status: "Upcoming",
    dates: "Oct 12 - Oct 20, 2024",
    stops: 4,
    cost: 3200,
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Tokyo Neon Nights",
    status: "Past",
    dates: "Mar 05 - Mar 15, 2023",
    stops: 2,
    cost: 2850,
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Untitled Trip to Bali",
    status: "Draft",
    dates: "Dates TBD",
    stops: 0,
    cost: 0,
    image: "",
  },
];

const recommendations = [
  {
    name: "Kyoto",
    country: "Japan",
    price: "$$$",
    text: "Historic temples, tranquil gardens, and traditional...",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Amalfi Coast",
    country: "Italy",
    price: "$$$",
    text: "Dramatic coastlines, pastel fishing villages, and lemo...",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Marrakech",
    country: "Morocco",
    price: "$$",
    text: "Vibrant souks, intricate palaces, and the lively...",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Redwood NP",
    country: "USA",
    price: "$",
    text: "Ancient forests, towering trees, and rugged Pacific...",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=80",
  },
];

function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "null"),
  );
  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function Protected({ children }) {
  return useAuth().user ? children : <Navigate to="/login" replace />;
}

function Sidebar() {
  const { user, logout } = useAuth();
  return (
    <aside className="sidebar">
      <Link className="side-brand" to="/dashboard">
        <span className="brand-mark">🌐</span>
        <span>
          <b>GlobeTrotter</b>
          <small>Your Travel Co-pilot</small>
        </span>
      </Link>

      <nav className="side-nav">
        <Link to="/dashboard" className="side-link">
          ⌂ <span>Home</span>
        </Link>
        <Link to="/trips" className="side-link">
          ◉ <span>My Trips</span>
        </Link>
        <Link to="/cities" className="side-link">
          ◎ <span>Explore</span>
        </Link>
        <Link to="/profile" className="side-link">
          ♙ <span>Profile</span>
        </Link>
      </nav>

      <Link className="plan-btn" to="/create-trip">
        ＋ Plan New Trip
      </Link>

      <div className="side-bottom">
        <Link to="/profile" className="side-link">
          ⚙ <span>Settings</span>
        </Link>
        <button className="side-link logout-link" onClick={logout}>
          ? <span>Help / Logout</span>
        </button>
      </div>
    </aside>
  );
}

function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-area">{children}</main>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      login(data);
      nav("/dashboard");
    } catch {
      // Demo fallback so the UI can be tested before MySQL is configured.
      if (email && password) {
        login({
          token: "demo-token",
          user: { id: 1, name: "Alex", email, role: "user" },
        });
        nav("/dashboard");
      } else setError("Enter your email and password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-visual">
        <div className="visual-overlay">
          <div className="visual-copy">
            <h1>
              "The world is a book,
              <br />
              and those who do
              <br />
              not travel read only
              <br />
              one page."
            </h1>
            <p>
              Begin your next great adventure with GlobeTrotter.
              <br />
              We handle the logistics so you can focus on the
              <br />
              journey.
            </p>
          </div>
        </div>
      </div>
      <div className="login-panel">
        <div className="login-box">
          <div className="login-logo">
            ✈ <span>GlobeTrotter</span>
          </div>
          <p className="login-sub">Welcome back, co-pilot.</p>

          <form onSubmit={submit}>
            <label>Email Address</label>
            <div className="input-icon">
              <span>✉</span>
              <input
                type="email"
                placeholder="nomad@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password-label">
              <label>Password</label>
              <a href="#forgot">Forgot Password?</a>
            </div>
            <div className="input-icon">
              <span>♙</span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="form-error">{error}</div>}
            <button className="login-btn">Login →</button>
          </form>

          <div className="or">
            <span>OR</span>
          </div>
          <button className="social-btn">◉ &nbsp; Continue with Google</button>
          <button className="social-btn">⌁ &nbsp; Continue with Apple</button>
          <p className="signup-text">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/signup", {
        name,
        email,
        password,
      });
      login(data);
      nav("/dashboard");
    } catch {
      login({
        token: "demo-token",
        user: { id: 1, name: name || "Alex", email, role: "user" },
      });
      nav("/dashboard");
    }
  };

  return (
    <div className="simple-auth">
      <div className="signup-card">
        <div className="login-logo">
          ✈ <span>GlobeTrotter</span>
        </div>
        <h1>Create your account</h1>
        <p>Start planning your next adventure.</p>
        <form onSubmit={submit}>
          <label>
            Name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Morgan"
            />
          </label>
          <label>
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nomad@example.com"
            />
          </label>
          <label>
            Password
            <input
              required
              minLength="6"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
            />
          </label>
          <button className="login-btn">Create Account →</button>
        </form>
        <p className="signup-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

function Dashboard() {
  const { user } = useAuth();
  return (
    <AppLayout>
      <div className="top-row">
        <div>
          <span className="eyebrow">DASHBOARD</span>
          <h1>Ready for your next adventure, {user?.name || "Alex"}?</h1>
        </div>
        <Link className="orange-btn" to="/create-trip">
          ✈ &nbsp; Plan New Trip
        </Link>
      </div>

      <div className="dashboard-top">
        <section className="overview card-ui">
          <h2>Travel Overview</h2>
          <div className="metric">
            <span className="metric-icon">◉</span>
            <div>
              Countries
              <br />
              Visited
            </div>
            <strong>12</strong>
          </div>
          <div className="metric">
            <span className="metric-icon gray">⌁</span>
            <div>
              Upcoming
              <br />
              Stops
            </div>
            <strong>3</strong>
          </div>
        </section>
        <section className="upcoming">
          <div className="section-title">
            <h2>Upcoming Itineraries</h2>
            <a href="#all">View all →</a>
          </div>
          <div className="upcoming-grid">
            <TripMini
              name="Swiss Alps Explorer"
              dates="Aug 12 - Aug 20"
              stops="4 Destinations"
              image="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80"
              badge="In 3 weeks"
            />
            <TripMini
              name="Tokyo City Lights"
              dates="Nov 05 - Nov 14"
              stops="2 Destinations"
              image="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80"
            />
          </div>
        </section>
      </div>

      <div className="section-title recommendation-title">
        <h2>Curated for You</h2>
        <button className="filter-circle">☷</button>
      </div>
      <div className="recommend-grid">
        {recommendations.map((r) => (
          <Recommendation key={r.name} {...r} />
        ))}
      </div>
    </AppLayout>
  );
}

function TripMini({ name, dates, stops, image, badge }) {
  return (
    <div className="trip-mini">
      <img src={image} />
      <div className="trip-mini-body">
        <b>{name}</b>
        <small>{dates}</small>
        <div>
          <span>◫ {stops}</span>
          {badge && <em>{badge}</em>}
        </div>
      </div>
    </div>
  );
}

function Recommendation({ name, country, price, text, image }) {
  return (
    <div className="recommend-card">
      <div className="recommend-image">
        <img src={image} />
        <button>♡</button>
      </div>
      <div className="recommend-body">
        <div className="rec-head">
          <b>{name}</b>
          <span>{price}</span>
        </div>
        <small>{country}</small>
        <p>{text}</p>
        <a href="#explore">Explore →</a>
      </div>
    </div>
  );
}

function MyTrips() {
  const [filter, setFilter] = useState("All Trips");
  return (
    <AppLayout>
      <div className="top-row">
        <div>
          <h1>My Trips</h1>
          <p className="muted">Manage and organize your travel itineraries.</p>
        </div>
        <div className="search-box">
          ⌕ <input placeholder="Search destinations, dates..." />
        </div>
      </div>
      <div className="pills">
        {["All Trips", "Upcoming", "Past", "Drafts"].map((x) => (
          <button
            className={filter === x ? "active" : ""}
            onClick={() => setFilter(x)}
            key={x}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="trip-grid">
        {demoTrips
          .filter(
            (t) =>
              filter === "All Trips" ||
              t.status === filter.replace("All Trips", ""),
          )
          .map((t) => (
            <TripCard key={t.id} trip={t} />
          ))}
      </div>
      <Link className="floating-plan" to="/create-trip">
        ＋ &nbsp; Plan New Trip
      </Link>
    </AppLayout>
  );
}

function TripCard({ trip }) {
  return (
    <div className="trip-card">
      <div className="trip-card-image">
        {trip.image ? (
          <img src={trip.image} />
        ) : (
          <div className="image-placeholder">△</div>
        )}
        <span className={"status " + trip.status.toLowerCase()}>
          {trip.status}
        </span>
      </div>
      <div className="trip-card-body">
        <h3>{trip.name}</h3>
        <p>▣ &nbsp;{trip.dates}</p>
        <div className="trip-card-footer">
          <span>⌖ &nbsp;{trip.stops} Stops</span>
          <span>▣ &nbsp;${trip.cost.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function CreateTrip() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    start_date: "",
    end_date: "",
    description: "",
    is_public: true,
  });
  const [cover, setCover] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/trips", form);
      nav(`/trips/${data.id}`);
    } catch {
      nav("/trips");
    }
  };

  return (
    <AppLayout>
      <div className="create-header">
        <Link to="/trips">× &nbsp; Create Trip</Link>
        <div className="steps">
          <b>1 Basics</b>
          <span>2 Destinations</span>
          <span>3 Itinerary</span>
        </div>
      </div>
      <form className="create-form" onSubmit={submit}>
        <label>Cover Photo</label>
        <div
          className="cover-upload"
          style={cover ? { backgroundImage: `url(${cover})` } : {}}
        >
          {!cover && (
            <div className="upload-box">
              ▧<b>Click to upload or drag & drop</b>
              <small>SVG, PNG, JPG or GIF (max. 5MB)</small>
            </div>
          )}
          <input
            type="url"
            placeholder="Optional cover image URL"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
          />
        </div>
        <label>
          Trip Name
          <input
            required
            placeholder="e.g., European Summer 2024"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <div className="two-inputs">
          <label>
            Start Date
            <input
              type="date"
              required
              value={form.start_date}
              onChange={(e) => setForm({ ...form, start_date: e.target.value })}
            />
          </label>
          <label>
            End Date
            <input
              type="date"
              required
              value={form.end_date}
              onChange={(e) => setForm({ ...form, end_date: e.target.value })}
            />
          </label>
        </div>
        <label>
          Trip Description <small>(Optional)</small>
          <textarea
            placeholder="What's the goal of this trip? (e.g., A relaxing culinary tour through Tuscany mixed with some light hiking.)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>
        <div className="privacy">
          <div>
            <span>◉</span>
            <div>
              <b>Public Trip</b>
              <small>Anyone with the link can view your itinerary.</small>
            </div>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={form.is_public}
              onChange={(e) =>
                setForm({ ...form, is_public: e.target.checked })
              }
            />
            <i></i>
          </label>
        </div>
        <div className="form-actions">
          <Link className="cancel-btn" to="/trips">
            Cancel
          </Link>
          <button className="save-btn">Save & Continue</button>
        </div>
      </form>
    </AppLayout>
  );
}

function Itinerary() {
  const [added, setAdded] = useState(false);
  return (
    <AppLayout>
      <div className="itinerary-head">
        <div>
          <div className="breadcrumbs">
            My Trips &nbsp;›&nbsp; Japan Explorer 2024
          </div>
          <h1>Japan Explorer 2024</h1>
          <p>▣ &nbsp; Oct 15 - Oct 28, 2024 (14 Days)</p>
        </div>
        <button className="save-btn">▣ &nbsp; Save Trip</button>
      </div>
      <div className="itinerary-layout">
        <section className="timeline">
          <div className="day-title">
            <span>1</span>
            <h2>Tokyo Arrival</h2>
            <em>Oct 15, Tue</em>
          </div>
          <div className="timeline-line">
            <ActivityCard
              image="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=500&q=80"
              title="Narita International Airport (NRT)"
              type="Arrival"
              time="14:00"
              cost="$0"
            />
            <ActivityCard
              title="Check-in at Shinjuku Granbell Hotel"
              type="Accommodation"
              time="16:30"
              cost="$120"
            />
            <button className="add-activity" onClick={() => setAdded(true)}>
              ⊕ Add Activity
            </button>
            {added && (
              <div className="added-note">
                New activity added — edit this item in your itinerary.
              </div>
            )}
            <button className="add-day">⊞ &nbsp; Add Next Day</button>
          </div>
        </section>
        <aside className="explore-panel">
          <div className="panel-title">
            <h2>⌕ Explore</h2>
            <span>☷</span>
          </div>
          <input placeholder="Search places, hotels, flights..." />
          <div className="explore-tabs">
            <b>Places</b>
            <span>Hotels</span>
            <span>Flights</span>
          </div>
          <ExploreItem
            name="Senso-ji..."
            type="Historic Buddhist..."
            image="https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=300&q=80"
          />
          <ExploreItem
            name="Tokyo..."
            type="Observation de..."
            image="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=300&q=80"
          />
        </aside>
      </div>
      <div className="budget-float">
        <span>
          ▣ Estimated Total
          <br />
          <b>$2,450</b>
        </span>
        <b>View Detailed Budget →</b>
      </div>
    </AppLayout>
  );
}

function ActivityCard({ image, title, type, time, cost }) {
  return (
    <div className="timeline-card">
      {image && <img src={image} />}
      <div className="drag">⁙</div>
      <div className="activity-info">
        <h3>{title}</h3>
        <small>⌂ {type}</small>
        <span className="tag">{type}</span>
      </div>
      <b className="time">{time}</b>
      <strong>{cost}</strong>
      <button className="dots">⋮</button>
    </div>
  );
}

function ExploreItem({ name, type, image }) {
  return (
    <div className="explore-item">
      <img src={image} />
      <div>
        <b>{name}</b>
        <small>{type}</small>
        <small>☆ 4.8</small>
      </div>
      <button>＋</button>
    </div>
  );
}

function Cities() {
  return (
    <AppLayout>
      <h1>Explore Destinations</h1>
      <p className="muted">
        Search cities and discover places for your next trip.
      </p>
      <div className="search-box wide">
        ⌕ <input placeholder="Search cities, countries, regions..." />
      </div>
      <div className="recommend-grid">
        {recommendations.concat(recommendations).map((r, i) => (
          <Recommendation key={i} {...r} />
        ))}
      </div>
    </AppLayout>
  );
}

function Profile() {
  const { user } = useAuth();
  return (
    <AppLayout>
      <h1>Profile & Settings</h1>
      <div className="profile-card card-ui">
        <div className="avatar">A</div>
        <div>
          <h2>{user?.name || "Alex"}</h2>
          <p>{user?.email || "nomad@example.com"}</p>
        </div>
      </div>
    </AppLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/trips"
          element={
            <Protected>
              <MyTrips />
            </Protected>
          }
        />
        <Route
          path="/create-trip"
          element={
            <Protected>
              <CreateTrip />
            </Protected>
          }
        />
        <Route
          path="/itinerary"
          element={
            <Protected>
              <Itinerary />
            </Protected>
          }
        />
        <Route
          path="/cities"
          element={
            <Protected>
              <Cities />
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}
