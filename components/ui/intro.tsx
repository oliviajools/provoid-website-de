export function Intro() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-8">Wir führen Sie durch Ihr Gehirn</h3>
          </div>
          
          {/* Card with primary blur background */}
          <div className="relative rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm p-8 md:p-12 shadow-lg">
            {/* Blur effect background */}
            <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/10 blur-3xl" />
            
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-lg text-center mb-6">
                <strong>From Insight To Impact</strong>
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Wir sind ein Hamburger StartUp, das neurowissenschaftliche Erkenntnisse in anwendbare
                Lösungen überführt, um einen messbaren positiven Wandel in Organisationen und Gesellschaft zu bewirken.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Wir entwickeln evidenzbasierte Tools, Trainings und Interventionen, die Entscheidungen,
                Zusammenarbeit und Strukturen durch neuronale Fortschritte messbar verbessern.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                So verfolgen wir das Ziel, Menschen in ihren persönlichen, leistungsorientierten Bereichen ihres Lebens
                zu unterstützen und ihre neuronale Gesundheit zu verbessern.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
