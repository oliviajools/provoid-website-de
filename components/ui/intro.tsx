export function Intro() {
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-8">Unser Ansatz</h3>
          </div>
          
          {/* Card with primary blur background */}
          <div className="relative rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm p-8 md:p-12 shadow-lg">
            {/* Blur effect background */}
            <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/10 blur-3xl" />
            
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <h4 className="text-lg font-semibold mb-2 text-primary">Neurowissenschaftlich fundiert</h4>
                  <p className="text-muted-foreground">Basierend auf aktueller Forschung</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold mb-2 text-primary">In engem Austausch mit Fachexperten</h4>
                  <p className="text-muted-foreground">Kontinuierliche Weiterentwicklung</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold mb-2 text-primary">Angewandte Forschung</h4>
                  <p className="text-muted-foreground">Praxisnahe Umsetzung</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold mb-2 text-primary">Gehirngerechte Methoden</h4>
                  <p className="text-muted-foreground">Individuell angepasst</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
