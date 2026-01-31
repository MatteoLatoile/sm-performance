type Props = {
  percent: number;
};

export default function Loader3D({ percent }: Props) {
  return (
    <div className="w-full px-8">
      <div className="mx-auto max-w-[520px] text-center">
        {/* 3D SM */}
        <div className="loaderStage">
          <div className="loaderGlow" />

          <div className="smScene" aria-hidden="true">
            <div className="smShadow" />
            <div className="smWrap">
              <div className="smRing" />
              <div className="smMark">SM</div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div
          className="mt-8 text-[14px] font-semibold tracking-[0.18em]"
          style={{ color: "#A8B0BD" }}
        >
          SM PERFORMANCE
        </div>

        <div
          className="mt-2 text-[26px] font-extrabold tracking-tight"
          style={{ color: "#F5F7FA" }}
        >
          Chargement
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div
            className="h-[10px] w-full rounded-full overflow-hidden"
            style={{ background: "#11151C", border: "1px solid #232A36" }}
          >
            <div
              className="h-full rounded-full loaderBar"
              style={{
                width: `${percent}%`,
                background: "linear-gradient(90deg, #D4AF37 0%, #E6C76A 100%)",
              }}
            />
          </div>

          <div className="mt-3 text-[12px]" style={{ color: "#788291" }}>
            {percent}%
          </div>
        </div>

        <div className="mt-8 text-[12px]" style={{ color: "#788291" }}>
          Préparation des assets & animations…
        </div>
      </div>
    </div>
  );
}
