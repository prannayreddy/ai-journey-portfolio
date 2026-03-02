import ArticleLayout from "@/components/ArticleLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Agentic Developer Workflow — Prannay Reddy",
  description:
    "Lessons learned from building real products entirely through AI conversation — no IDE, no terminal. What works, what breaks, and what to avoid.",
};

export default function AgenticWorkflowArticle() {
  return (
    <ArticleLayout
      title="The Agentic Developer Workflow"
      description="Lessons learned from building real products entirely through AI conversation — no IDE, no terminal. What works, what breaks, and what to avoid."
      tag="Essay"
      readTime="10 min"
      date="March 2026"
    >
      <h2>The Premise</h2>
      <p>
        Over two sessions totaling about 16 hours, I shipped two production
        websites entirely through conversation with an AI agent — a crisis
        resource hub for Indians stranded in the Gulf, and this portfolio site.
        No VS Code. No terminal. No manual git commands. Everything happened
        through natural language prompts and an agent that could write code,
        create repos, push commits, deploy, and even monitor the live site
        autonomously.
      </p>
      <p>
        This essay isn&apos;t about whether that&apos;s impressive. It&apos;s about what I
        actually learned — the failure modes that don&apos;t show up in demos, the
        mental model shifts required, and the practical tips for anyone trying
        this workflow.
      </p>

      <h2>What Actually Works Well</h2>

      <h3>Speed of Scaffolding</h3>
      <p>
        The initial build is genuinely fast. Describing a portfolio site with
        specific sections — hero, project grid, timeline, writing section,
        contact — and having working React components with Tailwind and Framer
        Motion in under 10 minutes is real. The agent chose sensible defaults for
        fonts, spacing, animations, and project structure.
      </p>
      <p>
        The Crisis Hub went from &quot;I want a resource page for stranded Indians&quot;
        to a live, deployed static site in about an hour. That&apos;s not marketing
        hype — it actually happened. But the next several hours were spent
        fixing what the first hour got wrong.
      </p>

      <h3>Iteration Through Conversation</h3>
      <p>
        The best part of this workflow is iteration speed. See a problem on the
        live site, describe it in plain English, and the agent fixes it and
        pushes the update. &quot;The airline names are jammed against the excerpt text
        on mobile&quot; → fix deployed in 2 minutes. &quot;Move the flight section above
        education&quot; → done.
      </p>
      <p>
        This is especially powerful for UI polish. Instead of context-switching
        between a browser, an IDE, and a terminal, you stay in one conversation.
        The feedback loop is tight.
      </p>

      <h3>Autonomous Monitoring</h3>
      <p>
        Setting up a scheduled task that checks official sources every hour,
        compares findings against the live site&apos;s data, auto-deploys corrections,
        and only notifies you when something genuinely new appears — that&apos;s a
        workflow that would normally require a custom backend, a cron server, and
        a deployment pipeline. Here it was configured through conversation and
        iterated on through four versions without writing any infrastructure
        code.
      </p>

      <h2>What Breaks</h2>

      <h3>Silent Failures Are the Norm</h3>
      <p>
        The most dangerous failure mode in agentic development is things that
        look right but aren&apos;t. The phone links on the Crisis Hub displayed
        correct numbers but had empty <code>href</code> attributes. The regex
        that parsed them was corrupted during JSON encoding when the file was
        pushed through the GitHub API — <code>\d</code> became{" "}
        <code>\\d</code>, silently breaking every phone link on the site.
      </p>
      <p>
        This is fundamentally different from a compile error or a crashed page.
        The site looked perfect. You had to actually tap a phone number to
        discover it was broken. In a traditional development workflow, you&apos;d
        catch this in code review or a test suite. In an agentic workflow, there
        is no code review step unless you explicitly add one.
      </p>
      <div className="callout-box">
        <p>
          <strong>Rule #1:</strong> Always test the deployed output, not the
          source. Click every link. Tap every button. Fill every form. The
          agent&apos;s code might be correct locally but corrupted in transit.
        </p>
      </div>

      <h3>Tool Limits Will Ambush You</h3>
      <p>
        The GitHub API connector has a practical file size limit around 15KB.
        Nobody tells you this upfront. You discover it when a push hangs for 4
        minutes and you have to kill it. Then you discover it again when a
        different file is too large. Then again with a binary image.
      </p>
      <p>
        Similarly, the Vercel deployment connector technically exists but
        doesn&apos;t actually deploy — you have to manually import the repo through
        Vercel&apos;s web UI. The tool appears functional in the interface but
        doesn&apos;t do what its name suggests.
      </p>
      <p>
        For the portfolio site, <code>package-lock.json</code> was 232KB — far
        too large for the API. The solution was to delete the local copy entirely
        and let Vercel regenerate it during build. That works, but it&apos;s the kind
        of workaround you only discover through failure.
      </p>

      <h3>Data Accuracy Is Your Problem</h3>
      <p>
        The agent will confidently generate plausible data that is wrong. Embassy
        helplines were duplicated across missions. Airport statuses were
        incorrect (&quot;SEVERELY DISRUPTED&quot; when operations were fully suspended).
        Airline URLs pointed to pages that had moved months ago.
      </p>
      <p>
        This isn&apos;t a flaw in the AI — it&apos;s a feature of the workflow. When you
        ask an agent to populate 60+ data points across embassies, airlines, and
        airports, some will be outdated or hallucinated. The developer&apos;s job
        shifts from writing code to verifying data.
      </p>

      <h3>The Proxy and Sandbox Trap</h3>
      <p>
        The initial deployment served the Crisis Hub through a proxy that
        sandboxed it in an iframe. This blocked every third-party script
        attempted — analytics, tracking pixels, even direct image beacons to
        first-party analytics endpoints. Four different workarounds all failed
        because the fundamental architecture was wrong.
      </p>
      <p>
        The lesson isn&apos;t about a specific proxy. It&apos;s about understanding your
        deployment environment&apos;s constraints before building features that depend
        on specific capabilities. If you don&apos;t control the <code>Content-Security-Policy</code>{" "}
        headers, no amount of clever JavaScript will save your analytics.
      </p>

      <h2>Mental Model Shifts</h2>

      <h3>You&apos;re a Director, Not an Engineer</h3>
      <p>
        The hardest adjustment is accepting that your job is no longer writing
        code. It&apos;s directing an agent — setting goals, reviewing output,
        catching problems, and deciding what to build next. This feels
        productive in a different way than traditional development. You cover
        more ground faster, but you give up the granular control that prevents
        subtle bugs.
      </p>

      <h3>Batch Everything When Users Are Watching</h3>
      <p>
        One of the most important operational lessons: when you have live users,
        never push individual file changes. The Crisis Hub had 14 concurrent
        users at one point. If I pushed <code>style.css</code> first and{" "}
        <code>app.js</code> second, there&apos;s a window where the live site has
        new CSS but old JavaScript. Users see a broken page.
      </p>
      <p>
        Always batch changes into a single commit. This required explicit
        coordination with the agent — &quot;don&apos;t push yet, make all the changes
        locally, then push everything at once.&quot; Without this instruction, the
        agent&apos;s default behavior is to push after each change.
      </p>

      <h3>Separate What You Know From What the Agent Knows</h3>
      <p>
        The agent doesn&apos;t have your context about what matters. It will happily
        put CBSE exam updates above airline flight status because it doesn&apos;t
        know that stranded travelers care about flights first. It will add fake
        projects to your portfolio because you asked for a &quot;projects section&quot;
        and it wanted to fill the grid.
      </p>
      <p>
        Your role is to provide the priority stack and verify the judgment calls.
        The agent handles execution; you handle intent.
      </p>

      <h2>Practical Tips</h2>

      <ol>
        <li>
          <strong>Run a full functional audit before sharing anything.</strong>{" "}
          Not a visual check — a click-every-element, tap-every-link,
          test-every-form audit. Silent failures will embarrass you.
        </li>
        <li>
          <strong>Know your tool limits before you depend on them.</strong> File
          size limits on API connectors. Deployment tools that don&apos;t actually
          deploy. Analytics scripts that get blocked by sandboxes. Test the
          infrastructure path before building features on top of it.
        </li>
        <li>
          <strong>Use separate fields for separate concepts.</strong> Don&apos;t use
          {" "}<code>lastUpdated</code> for both &quot;when the data changed&quot; and &quot;when
          the system last checked.&quot; The monitoring timestamp confusion could have
          been avoided with proper data modeling from the start.
        </li>
        <li>
          <strong>Design for mobile from the first screenshot.</strong> Not
          &quot;responsive&quot; — actually look at it on a phone. Collapsible sections,
          compact views, and floating action buttons aren&apos;t nice-to-haves on a
          crisis site. They&apos;re the difference between useful and unusable.
        </li>
        <li>
          <strong>The agent defaults to eager execution.</strong> It will push
          code, deploy, and move to the next task unless you tell it to wait.
          When you have live users, add explicit &quot;hold, let me review&quot;
          checkpoints to your prompts.
        </li>
        <li>
          <strong>Reddit is the channel for crisis content.</strong> 139 out of
          408 visitors came from Reddit — 34% of all traffic, from a single
          night of posting. But automod will remove your posts if you include
          links in the body. Post text-only and drop the link in the first
          comment.
        </li>
        <li>
          <strong>Iterate on the monitoring, not just the product.</strong> The
          crisis monitoring system went through four versions — from manual
          notify-only to fully autonomous two-tier deployment. Each version
          taught something about what to automate and what to keep manual.
          Don&apos;t assume your first automation design is right.
        </li>
        <li>
          <strong>Cross-reference everything against primary sources.</strong>{" "}
          The agent pulled embassy data from its training set. The real numbers
          came from the actual embassy websites. For crisis information,
          &quot;probably correct&quot; isn&apos;t good enough.
        </li>
      </ol>

      <h2>The Verdict</h2>
      <p>
        Building through AI conversation is genuinely faster for going from zero
        to a working product. The Crisis Hub was live and serving real users
        within hours — something that would have taken me days working
        traditionally, especially given the data aggregation across 9 embassies,
        12 airlines, and 7 airports.
      </p>
      <p>
        But the speed advantage erodes in the quality phase. Debugging the regex
        corruption, auditing 60 URLs, fixing mobile layouts, and iterating the
        monitoring system consumed more time than the initial build. The
        productivity gain isn&apos;t 10x across the full lifecycle — it&apos;s more like
        3-4x, with the savings concentrated in scaffolding and iteration.
      </p>
      <p>
        The workflow is real. The tools are capable. The results ship. But the
        developer&apos;s job doesn&apos;t disappear — it shifts from writing code to
        directing agents, verifying output, and catching the failures that
        automation misses.
      </p>
      <p>
        And that last part — catching what automation misses — is still entirely
        a human skill.
      </p>
    </ArticleLayout>
  );
}
