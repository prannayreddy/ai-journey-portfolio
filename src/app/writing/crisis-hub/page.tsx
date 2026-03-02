import ArticleLayout from "@/components/ArticleLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How I Built a Crisis Hub in Under an Hour with AI — Prannay Reddy",
  description:
    "The full story of orchestrating autonomous agents to ship a production resource hub for Indian expats during the 2026 Gulf Crisis.",
};

export default function CrisisHubArticle() {
  return (
    <ArticleLayout
      title="How I Built a Crisis Hub in Under an Hour with AI"
      description="The full story of orchestrating autonomous agents to ship a production resource hub for Indian expats during the 2026 Gulf Crisis."
      tag="Case Study"
      readTime="12 min"
      date="March 2026"
    >
      <h2>The Context</h2>
      <p>
        On the night of March 1, 2026, military escalation in the Gulf region
        grounded all flights across the UAE, Qatar, Kuwait, and Bahrain. Airports
        shut down. Airlines suspended operations. Thousands of Indian nationals
        were stranded with no clear source of consolidated information — embassy
        helplines were scattered across different websites, airline rebooking
        policies were buried in press releases, and CBSE exam postponement
        details were hard to find.
      </p>
      <p>
        I decided to build a single resource hub that put everything in one
        place: embassy emergency numbers with one-tap calling, real-time airport
        status, airline rebooking links, and education updates. The catch — I
        built the entire thing through conversation with an AI agent. No IDE. No
        terminal. Just prompts.
      </p>

      <h2>The Stack</h2>
      <p>
        The site is intentionally simple — a single-page static HTML app with
        vanilla JavaScript. No framework overhead, no build step, instant load
        times. The data lives in a <code>data.json</code> file that gets updated
        by an autonomous monitoring system. Hosted on Vercel with auto-deploy
        from GitHub.
      </p>
      <p>
        Why not React or Next.js? Because this was a crisis tool. Every second
        of load time matters when someone is stranded at an airport on a phone
        with spotty connectivity. Static HTML with inline CSS loads instantly.
      </p>

      <h2>What Actually Happened — Hour by Hour</h2>

      <h3>Hour 1: Skeleton to Live Site</h3>
      <p>
        The first prompt described the vision — a mobile-first resource hub
        covering embassy contacts, flight status, airline rebooking, and
        education advisories for Indians in the Gulf. The AI agent scaffolded
        the HTML, CSS, and JavaScript, structured the data model, and created the
        GitHub repo. Within the first hour, a working version was live.
      </p>
      <p>
        But &quot;working&quot; and &quot;correct&quot; are very different things. This is where
        the real story begins.
      </p>

      <h3>Hour 2-3: The Bug Hunt</h3>
      <p>
        The first major disaster: <strong>every phone and WhatsApp link on the
        site was broken</strong>. The numbers displayed correctly in the UI, but
        clicking them did nothing. The <code>href</code> attributes were empty.
      </p>
      <p>
        The root cause was subtle and instructive. The <code>cleanPhone</code>{" "}
        function used a regex <code>/[^+\d]/g</code> to strip non-digit
        characters from phone numbers. In the source code, this was correct. But
        when the file was pushed to GitHub through the API connector, the JSON
        encoding process double-escaped the backslash — turning{" "}
        <code>\d</code> (digit character class) into <code>\\d</code> (literal
        backslash + letter d). The regex then stripped all actual digits and kept
        only the <code>+</code> sign and any literal <code>d</code> characters.
      </p>
      <div className="callout-box">
        <p>
          <strong>Lesson:</strong> When pushing code through API connectors that
          use JSON encoding, regex patterns with backslashes are a minefield.
          Always verify the deployed output, not just the source.
        </p>
      </div>
      <p>
        This was a silent failure — the site looked fine visually. If I hadn&apos;t
        tested the actual tap-to-call functionality, every phone link would have
        been useless for real users in a real crisis.
      </p>

      <h3>The 29 Broken URLs</h3>
      <p>
        Next came the link audit. Out of 60 unique URLs on the site, 29 were
        broken. Airports had rebranded (Abu Dhabi became Zayed International with
        a new domain). Airlines had moved their flight status pages. Some paths
        were simply wrong.
      </p>
      <p>
        The fix required both automated checks and manual browser verification —
        many airline sites use bot protection that returns false 000 status codes
        to <code>curl</code> but load fine in a real browser. The agent tested
        each URL both ways, distinguishing genuine 404s from bot-protection false
        positives.
      </p>

      <h3>Embassy Data Accuracy</h3>
      <p>
        The AI initially duplicated the same helpline number across multiple
        embassy entries. For example, +971-543090571 (CGI Dubai&apos;s PBSK helpline)
        was incorrectly listed under both Dubai and Abu Dhabi. Cross-referencing
        against the actual embassy websites revealed that each mission has
        distinct numbers — Dubai has separate lines for housemaids in distress
        and general helplines, while Abu Dhabi has a death emergency line and a
        female domestic workers line.
      </p>
      <div className="callout-box">
        <p>
          <strong>Lesson:</strong> AI agents will confidently populate data that
          looks plausible but is wrong. For anything people depend on in a
          crisis, verify every single entry against primary sources. No
          shortcuts.
        </p>
      </div>

      <h2>The Analytics Saga</h2>
      <p>
        I wanted to know if anyone was actually using the site. Simple enough,
        right? Add an analytics script. Except the site was initially hosted
        through a proxy that sandboxes content in an iframe, blocking all
        third-party scripts.
      </p>
      <p>
        First attempt: GoatCounter script — blocked by CSP. Second attempt:
        explicit <code>https://</code> prefix on the script URL — still blocked.
        Third attempt: <code>noscript</code> pixel fallback — blocked. Fourth
        attempt: inline JavaScript beacon that fires a direct image request to
        GoatCounter&apos;s API after a 3-second delay — also blocked.
      </p>
      <p>
        The solution was architectural: move hosting from the sandboxed proxy to
        Vercel, where the site runs without iframe restrictions. Vercel Analytics
        works natively because it&apos;s a first-party script served from the same
        domain.
      </p>
      <div className="callout-box">
        <p>
          <strong>Lesson:</strong> If your hosting environment sandboxes your
          site, no amount of clever script workarounds will save you. Fix the
          hosting, not the hacks.
        </p>
      </div>

      <h2>The Monitoring System</h2>
      <p>
        A crisis resource hub is useless if the data goes stale. The monitoring
        system went through four iterations:
      </p>
      <ol>
        <li>
          <strong>v1 — Manual check, notify only.</strong> A scheduled task ran
          every 4 hours, searched for updates, and sent me a notification. I had
          to manually review and push changes. Slow and dependent on me being
          awake.
        </li>
        <li>
          <strong>v2 — Every 2 hours with expanded sources.</strong> Added
          first-party source fetching (directly checking Emirates, Etihad, Qatar
          Airways, MEA, DGCA official pages instead of relying on news articles).
          Added deduplication so the same finding wasn&apos;t reported twice.
        </li>
        <li>
          <strong>v3 — Hourly with structured diffs.</strong> Each run fetched
          the live <code>data.json</code> from Vercel and compared it
          field-by-field against fresh intelligence. Added a{" "}
          <code>previous_findings.json</code> tracker to prevent duplicate
          notifications.
        </li>
        <li>
          <strong>v4 — Fully autonomous two-tier system.</strong> Tier 1
          (corrections to existing data — airport status changes, airline
          deadline extensions) auto-deployed directly to GitHub. Tier 2 (entirely
          new information — new advisories, new resources) also auto-deployed
          into a structured &quot;Live Updates&quot; feed. I only got notified for
          structural changes that needed judgment.
        </li>
      </ol>
      <p>
        One subtle bug in the monitoring UI: the &quot;Last checked&quot; timestamp used
        the <code>lastUpdated</code> field (when data last changed) instead of a
        separate <code>lastChecked</code> field (when the cron last ran). When
        the cron ran hourly but found nothing new, users saw &quot;Last checked 1h
        58m ago&quot; even though the system had just scanned 20 minutes earlier.
        Separating these two timestamps fixed the trust issue.
      </p>

      <h2>Going Live and the Reddit Effect</h2>
      <p>
        The site went live and I posted to several subreddits. The first posts to
        r/india and r/dubai were auto-removed by aggressive spam filters —
        link posts from accounts posting about a crisis trigger every automod
        rule in the book.
      </p>
      <p>
        The workaround: post as text-only (no link in the body), drop the URL as
        the first comment, frame it as &quot;found this resource&quot; rather than &quot;I
        built this&quot;, and end with a question to drive engagement. The posts that
        survived the filters drove real traffic — 408 visitors and 522 page views
        by morning, with 139 referrals from Reddit alone.
      </p>

      <h2>The Mobile UX Grind</h2>
      <p>
        The site was built mobile-first, but the first real user feedback (my
        own, on my phone at 5 AM) revealed problems:
      </p>
      <ul>
        <li>
          Embassy helplines for 9 countries created a 3-screen scroll on mobile.
          Fixed with collapsible sections — compact view showing country + primary
          number, expandable for full details.
        </li>
        <li>
          Airline names and status excerpts were jammed together with no spacing
          (&quot;Air India81+ flights cancelled...&quot;). Fixed with proper{" "}
          <code>display: block</code> stacking.
        </li>
        <li>
          A full-width sticky share bar at the bottom was blocking content.
          Replaced with a floating action button (FAB) in the bottom-right
          corner — the standard mobile pattern.
        </li>
        <li>
          Section ordering put CBSE education updates before flight disruptions,
          when most users cared about flights first.
        </li>
      </ul>

      <h2>The GitHub Connector Limitation</h2>
      <p>
        The entire build was done through an AI agent that pushes code via
        GitHub&apos;s API. The connector has a practical file size limit of roughly
        15KB — anything larger causes the request to hang indefinitely. This hit
        us on three files: <code>app.js</code> (31KB),{" "}
        <code>style.css</code> (22KB), and <code>data.json</code> (18KB).
      </p>
      <p>
        The workarounds evolved: splitting CSS into multiple smaller files,
        using subagent processes for large file pushes, and in one case, manually
        uploading via the GitHub web UI. The OG preview image (82KB) never made
        it through the API at all — that was a manual upload through GitHub&apos;s
        file upload interface.
      </p>
      <div className="callout-box">
        <p>
          <strong>Lesson:</strong> Know the limits of your tools before you
          depend on them. When building through API-only workflows, large binary
          files and big source files need a fallback plan.
        </p>
      </div>

      <h2>What I&apos;d Do Differently</h2>
      <ul>
        <li>
          <strong>Run a full functional audit before the first share.</strong>{" "}
          Testing every link, every phone number, every WhatsApp deeplink. The
          29 broken URLs and dead phone links could have reached real users.
        </li>
        <li>
          <strong>Start with Vercel hosting from day one.</strong> The proxy
          hosting detour wasted hours on analytics workarounds that were never
          going to work.
        </li>
        <li>
          <strong>Build the monitoring system as two-tier from the start.</strong>{" "}
          Iterating from manual-notify to semi-auto to fully-autonomous took
          several cycles that could have been designed upfront.
        </li>
        <li>
          <strong>Batch every commit.</strong> With live users arriving from
          Reddit, individual file pushes risk showing a half-broken site. One
          commit with all changes, always.
        </li>
      </ul>

      <h2>The Numbers</h2>
      <p>
        408 unique visitors. 522 page views. 139 Reddit referrals. 82% bounce
        rate (expected for a single-page resource — people find what they need
        and leave). All within about 12 hours of the first deployment, during an
        active crisis, built entirely through AI conversation.
      </p>
      <p>
        The site is still live at{" "}
        <a
          href="https://gulf-india-crisis-hub.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          gulf-india-crisis-hub.vercel.app
        </a>
        . The code is open source on{" "}
        <a
          href="https://github.com/prannayreddy/gulf-india-crisis-hub"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>

      <hr />
      <p>
        This was my first project built entirely with AI agents. The next
        article covers the broader lessons — what actually works in agentic
        development workflows, what breaks, and what to watch out for.
      </p>
    </ArticleLayout>
  );
}
