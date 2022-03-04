
// [OFF_COMBO] {"material":"ui_editor_properties_position","combo":"POSITION","type":"options","default":0,"options":{"Center":0,"Post":1,"Pre":2}}

varying vec4 v_TexCoord;
varying vec2 v_Scroll;

uniform sampler2D g_Texture0; // {"material":"ui_editor_properties_framebuffer","hidden":true}
uniform sampler2D g_Texture1; // {"material":"ui_editor_properties_flow_map","mode":"flowmask","default":"util/noflow"}
uniform sampler2D g_Texture2; // {"material":"ui_editor_properties_flow_phase"}
uniform float g_Time;

uniform float g_FlowSpeed; // {"material":"ui_editor_properties_speed","default":1,"range":[0.01, 1]}
uniform float g_FlowAmp; // {"material":"ui_editor_properties_strength","default":1,"range":[0.01, 1]}
uniform float g_FlowPhaseScale; // {"material":"ui_editor_properties_phase_scale","default":1,"range":[0.01, 10]}

void main() {

	float flowPhase = (texSample2D(g_Texture2, v_TexCoord.xy * g_FlowPhaseScale).r - 0.5);
	vec2 flowColors = texSample2D(g_Texture1, v_TexCoord.zw).rg;
	vec2 flowMask = (flowColors.rg - vec2(0.498, 0.498)) * 2.0;
	
	vec2 cycles = vec2(	frac(g_Time * g_FlowSpeed),
						frac(g_Time * g_FlowSpeed + 0.5));
	
	float blend = 2 * abs(cycles.x - 0.5);
	blend = smoothstep(max(0, flowPhase), min(1, 1 + flowPhase), blend);
	
	vec2 flowUVOffset1 = flowMask * g_FlowAmp * 0.1 * (cycles.x);
	vec2 flowUVOffset2 = flowMask * g_FlowAmp * 0.1 * (cycles.y);

	vec4 albedo = mix(texSample2D(g_Texture0, v_TexCoord.xy + flowUVOffset1),
					texSample2D(g_Texture0, v_TexCoord.xy + flowUVOffset2),
					blend);

	gl_FragColor = albedo;
}
