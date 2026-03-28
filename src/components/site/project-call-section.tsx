export function ProjectCallSection({
  title,
  children,
  border = true,
}: {
  title: string;
  children: React.ReactNode;
  border?: boolean;
}) {
  return (
    <section className={border ? "border-b border-neutral-200 bg-white" : "bg-white"}>
      <div className="site-nav-frame py-12 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
          <div>
            <h2 className="text-[19px] font-semibold tracking-[-0.03em] text-[#101010]">{title}</h2>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}
